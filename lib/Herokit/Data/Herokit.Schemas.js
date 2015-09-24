//instance for Router in Herokit Routing
Herokit.Data._schemas={};
Herokit.Data.setSchema = function(name, data, collectionName){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data.setSchema "+name);
    if (typeof collectionName === 'undefined') collectionName=name; //collectionName is optional, then the schema name is used

    if (typeof Herokit.Data[collectionName] === 'undefined' )
        Herokit.Data.newCollection(collectionName);

    if (typeof Herokit.Data[collectionName] === 'undefined' ) //this should never happen due to prior autocreation of new collections
        throw new Herokit.Error("Collection "+collectionName+" undefined.");

    if (typeof Herokit.Data._schemas[name] !== 'undefined' && Herokit.Data._schemas[name].data instanceof SimpleSchema)
        throw new Herokit.Error("Schema "+name+" for "+collectionName+" yet configured and attached.");

    Herokit.Data._schemas[name] = {name: name, collection: collectionName, data: data}
};
Herokit.Data.appendSchema = function(name, data, collectionName){
    check(name, String);
    check(data, Object);
    check(collectionName, String);
    var BaseSchema = Herokit.Data.getSchemaData(name);

    if (appendSchema instanceof SimpleSchema)
        var appendSchema = data;
    else
        var appendSchema = new SimpleSchema(data);

    var newSchema=Herokit.Data.mergeSchemas({BaseSchema: BaseSchema, newSchema: data})._schema;
    return Herokit.Data.setSchema (name, newSchema, collectionName);};
Herokit.Data.newCollection = function(name){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data.newCollection "+name);

    if (typeof name === 'undefined') throw new Herokit.Error("Collection name parameter required");

    Herokit.Data[name] = new Mongo.Collection(name.toLowerCase());

    return Herokit.Data[name];
};
Herokit.Data.getSchema = function(name){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data.getSchema "+name);
    if (typeof Herokit.Data._schemas[name] === 'undefined') throw new Herokit.Error("Unknown Schema "+name);

    return Herokit.Data._schemas[name];
};
Herokit.Data.getSchemaData = function(name){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data.getSchema "+name);
    if (typeof Herokit.Data._schemas[name] === 'undefined') throw new Herokit.Error("Unknown Schema "+name);

    if (Herokit.Data._schemas[name].data instanceof SimpleSchema)
        return Herokit.Data._schemas[name].data.schema();

    else    //we're still in configuration phase, it's an object
        return Herokit.Data._schemas[name].data;

};
Herokit.Data.fieldExists = function(collection, field){
    var schemaData;
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data.fieldExists ", collection, field);

    schemaData = Herokit.Data.getSchemaData(collection);
    if (typeof schemaData === 'undefined') throw new Herokit.Error("Unknown Schema "+name);

    return (typeof schemaData[field] !== 'undefined');

};
Herokit.Data.getFieldLabel = function(collection, field){
    var schemaData;
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data.getFieldLabel ", collection, field);

    schemaData = Herokit.Data.getSchemaData(collection);
    if (typeof schemaData === 'undefined') throw new Herokit.Error("Unknown Schema "+name);
    if (typeof schemaData[field] === 'undefined') throw new Herokit.Error("Unknown Field "+field);

    if (typeof schemaData[field].label !== 'undefined') return schemaData[field].label;
    else return '';

};

Herokit.Data.getSchemas = function(){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data.getSchemas: Returned "+Herokit.Data._schemas.length+" Schemas ");
    return Herokit.Data._schemas;
};

Herokit.Data._schemas.__setup=function(){
    if (Herokit.Helper.debug.isLog(5)) console.log("Herokit.Data._schemas.setup");

    _.each(Herokit.Data._schemas, function(element, name, list){
        if (name=='__setup') return;
        if (Herokit.Helper.debug.isLog(2))  console.log("Herokit.Data._schemas setup schema '"+name+"' to "+element.collection);

        Herokit.Data._schemas[name].data=new SimpleSchema(Herokit.Data._schemas[name].data);
        Herokit.Data[Herokit.Data._schemas[name].collection].attachSchema(Herokit.Data._schemas[name].data);

    });
};

Herokit.Data.mergeSchemas = function(schemas) {

  // Merge all provided schema definitions.
  // This is effectively a shallow clone of each object, too,
  // which is what we want since we are going to manipulate it.
  var mergedSchema = {};
  _.each(schemas, function(schema) {

    // Create a temporary SS instance so that the internal object
    // we use for merging/extending will be fully expanded
    if (Match.test(schema, SimpleSchema)) {
      schema = schema._schema;
    } else {
      schema = Herokit.Data.addImplicitKeys(Herokit.Data.expandSchema(schema));
    }

    // Loop through and extend each individual field
    // definition. That way you can extend and overwrite
    // base field definitions.
    _.each(schema, function(def, field) {
      mergedSchema[field] = mergedSchema[field] || {};
      _.extend(mergedSchema[field], def);
    });

  });

  // If we merged some schemas, do this again to make sure
  // extended definitions are pushed into array item field
  // definitions properly.
  schemas.length && Herokit.Data.adjustArrayFields(mergedSchema);

  return mergedSchema;
};

Herokit.Data.addImplicitKeys = function(schema) {
  var arrayKeysToAdd = [], objectKeysToAdd = [], newKey, key, i, ln;

  // Pass 1 (objects)
  _.each(schema, function(def, existingKey) {
    var pos = existingKey.indexOf(".");
    while (pos !== -1) {
      newKey = existingKey.substring(0, pos);

      // It's an array item; nothing to add
      if (newKey.substring(newKey.length - 2) === ".$") {
        pos = -1;
      }
      // It's an array of objects; add it with type [Object] if not already in the schema
      else if (existingKey.substring(pos, pos + 3) === ".$.") {
        arrayKeysToAdd.push(newKey); // add later, since we are iterating over schema right now
        pos = existingKey.indexOf(".", pos + 3); // skip over next dot, find the one after
      }
      // It's an object; add it with type Object if not already in the schema
      else {
        objectKeysToAdd.push(newKey); // add later, since we are iterating over schema right now
        pos = existingKey.indexOf(".", pos + 1); // find next dot
      }
    }
  });

  for (i = 0, ln = arrayKeysToAdd.length; i < ln; i++) {
    key = arrayKeysToAdd[i];
    if (!(key in schema)) {
      schema[key] = {type: [Object], optional: true};
    }
  }

  for (i = 0, ln = objectKeysToAdd.length; i < ln; i++) {
    key = objectKeysToAdd[i];
    if (!(key in schema)) {
      schema[key] = {type: Object, optional: true};
    }
  }

  // Pass 2 (arrays)
  Herokit.Data.adjustArrayFields(schema);

  return schema;
};

Herokit.Data.expandSchema = function(schema) {
  // Flatten schema by inserting nested definitions
  _.each(schema, function(val, key) {
    var dot, type;
    if (!val) {
      return;
    }
    if (Match.test(val.type, SimpleSchema)) {
      dot = '.';
      type = val.type;
      val.type = Object;
    } else if (Match.test(val.type, [SimpleSchema])) {
      dot = '.$.';
      type = val.type[0];
      val.type = [Object];
    } else {
      return;
    }
    //add child schema definitions to parent schema
    _.each(type._schema, function(subVal, subKey) {
      var newKey = key + dot + subKey;
      if (!(newKey in schema)) {
        schema[newKey] = subVal;
      }
    });
  });
  return schema;
};

Herokit.Data.adjustArrayFields = function(schema) {
  _.each(schema, function(def, existingKey) {
    if (_.isArray(def.type) || def.type === Array) {
      // Copy some options to array-item definition
      var itemKey = existingKey + ".$";
      if (!(itemKey in schema)) {
        schema[itemKey] = {};
      }
      if (_.isArray(def.type)) {
        schema[itemKey].type = def.type[0];
      }
      if (def.label) {
        schema[itemKey].label = def.label;
      }
      schema[itemKey].optional = true;
      if (typeof def.min !== "undefined") {
        schema[itemKey].min = def.min;
      }
      if (typeof def.max !== "undefined") {
        schema[itemKey].max = def.max;
      }
      if (typeof def.allowedValues !== "undefined") {
        schema[itemKey].allowedValues = def.allowedValues;
      }
      if (typeof def.decimal !== "undefined") {
        schema[itemKey].decimal = def.decimal;
      }
      if (typeof def.exclusiveMax !== "undefined") {
        schema[itemKey].exclusiveMax = def.exclusiveMax;
      }
      if (typeof def.exclusiveMin !== "undefined") {
        schema[itemKey].exclusiveMin = def.exclusiveMin;
      }
      if (typeof def.regEx !== "undefined") {
        schema[itemKey].regEx = def.regEx;
      }
      if (typeof def.blackbox !== "undefined") {
        schema[itemKey].blackbox = def.blackbox;
      }
      // Remove copied options and adjust type
      def.type = Array;
      _.each(['min', 'max', 'allowedValues', 'decimal', 'exclusiveMax', 'exclusiveMin', 'regEx', 'blackbox'], function(k) {
          if (k in def) {
              delete def[k];
            }
      });
    }
  });
};

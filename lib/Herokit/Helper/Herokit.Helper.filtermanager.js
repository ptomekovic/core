'use strict';
/**
 * Constructor, with class name
 */
Herokit.Helper.query = function (initQuery) {
    this._filterQuery = {};
    if (Match.test(initQuery, Object)) this._filterQuery = EJSON.clone(initQuery);
};

/**
 * Public method, assigned to prototype
 */
Herokit.Helper.query.prototype = {
        get: function () {
            return this._filterQuery;
        },
        append: function (query) {
            for (var key in query) {
                var obj = query[key];
                if (typeof (this._filterQuery[key]) == 'undefined') this._filterQuery[key] = obj;
                else {
                    for (var prop in obj) {
                        // important check that this is objects own property
                        // not from prototype prop inherited
                        if (obj.hasOwnProperty(prop)) {
                            this._filterQuery[key][prop] = obj[prop];
                        }
                    }
                }
            }
            return this;
        },
        restrictToField: function (relationId, fieldName) {
            var appendQuery={};
            appendQuery[fieldName]=relationId;
            return this.append(appendQuery);
        },
        restrictToList: function (fieldValue, fieldName) {
            var appendQueryExists={}, appendQueryIn={};
            appendQueryExists[fieldName]={$exists: true};

            if (Match.test(fieldValue, Object) || _.isArray(fieldValue)) appendQueryIn[fieldName]={ $in: fieldValue};
            else appendQueryIn[fieldName]={ $in: [fieldValue] };

            return this.append(appendQueryExists).append(appendQueryIn);
        },
        //this is separated to allow beeing extended from other packs
        getDefaultOwnersList: function(userId) {
            return [userId];
        },
        restrictToOwners: function (userId) {
            var appendQueryExists={ owners: {$exists: true} };
            var appendQueryIn={ owners: { $in: this.getDefaultOwnersList(userId) }};

            return this.append({$and:[appendQueryExists,appendQueryIn]});
        },
        addRestrictToUser: function (userId) {
            return this.restrictToOwners(userId);
        },
        addExcludeUser: function (userId) {
            return this
                .append({
                    owners: {
                        $nin: [userId]
                    }
                });
        }
    }

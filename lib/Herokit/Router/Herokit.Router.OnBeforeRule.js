/* Handling of OnBeforeRules - Independent of Router type */
Herokit.Router.OnBeforeRule =  function (type, name, data, options) {
        if (typeof Herokit.Router[type] === 'undefined')
        {
            throw new Herokit.Error("Unknown router type: " + type);
        }

        /*functions */
        this.add = function() {
             Herokit.Behavior.OnBeforeActions[this.name]=this;
            return this;
        };

        this.run = function() {
            console.log(this, this.data);
            if (typeof this.data!=='undefined')
                return this.data(Router.current());
            else
                return false;
        }

        this.addException = function(exceptionpath) {
            this.options.except.push(exceptionpath);
            return this.options.except;
        };

        this.apply = function() {
         this.router.applyOnBefore(this);
        };

        this.type = type;
        this.name = name;
        this.options = options;
        this.data = data;

        //instanciate Router of defined type
        this.router = Herokit.Router[type];

        this.add();
};

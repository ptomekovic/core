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
        restrictToOwners: function (userId) {
            var appendQueryExists={}, appendQueryIn={};

            var userIdAndGroups = Roles.getGroupsForUser(userId);
            userIdAndGroups.push(userId);  //also check for userId itself

            appendQueryExists={ owners: {$exists: true} };
            appendQueryIn={ owners: { $in: userIdAndGroups}};

            return this.append(appendQueryExists).append(appendQueryIn);
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

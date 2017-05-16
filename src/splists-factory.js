(function () {
    'use strict';

    angular
        .module('splists')
        .factory('spListsFactory', spListsFactory);

    spListsFactory.inject = ['$log', '$http', '$q'];
    function spListsFactory($log, $http, $q) {
        var listFactory = {
            description: 'listFactory',
            getAllItems: getAllItems,
            getViewFields: getViewFields,
            getListFields: getListFields,
            getViewFieldsRitch: getViewFieldsRitch
        };

        return listFactory;

        //////////////////////////////////////////////
        function concatUrls(a, b) {
            a = trimUrl(a);
            b = trimUrl(b);
            if (a.indexOf('http') == 0) {
                return (a + '/' + b);
            }
            else {
                return ('/' + a + '/' + b);
            }

            function trimUrl(url) {
                return url.trim()
                    .replace(/\/\s*$/, "")
                    .replace(/^\//, "");
            }
        }

        function cleanupField(field) {

            var cleanedField = {
                Title: field.Title,
                InternalName: field.InternalName,

                TypeAsString: field.TypeAsString,
                TypeDisplayName: field.TypeDisplayName,
                Description: field.Description,
                Group: field.Group,

                AllowMultipleValues: field.AllowMultipleValues,
                DefaultValue: field.DefaultValue,

                Required: field.Required,
                Hidden: field.Hidden,
                ReadOnlyField: field.ReadOnlyField,

                LookupField: field.LookupField,
                LookupList: field.LookupList,

                RichText: field.RichText, //true/false
                NumberOfLines: field.NumberOfLines,

                SchemaXml: field.SchemaXml,
                Id: field.Id
            }

            if (field.Choices) {
                cleanedField.Choices = field.Choices.results;
            }

            $log.info(cleanedField.TypeAsString, JSON.stringify(cleanedField, null, 3));

            return cleanedField;
        }

        /*Get view fields */
        function getViewFields(siteUrl, listTitle, viewTitle) {
            var viewUrl = concatUrls(siteUrl, "/_api/web/lists/getByTitle('" + listTitle + "')/views/getByTitle('" + viewTitle + "')/viewfields")
            $log.info(viewUrl);
            return $http({
                url: viewUrl,
                method: 'GET',
                headers: { accept: 'application/json;odata=verbose' }
            })
                .then(function (results) {
                    return results.data.d.Items.results;
                });
        }


        /*Get view fields with all useful field properties*/
        function getViewFieldsRitch(siteUrl, listTitle, viewTitle) {
            var viewFieldsPromise = getViewFields(siteUrl, listTitle, viewTitle);
            var listFieldsPromise = getListFields(siteUrl, listTitle);

            return $q.all([viewFieldsPromise, listFieldsPromise])
                .then(function (results) {
                    var viewFields = results[0];
                    var listFields = results[1];
                    viewFields = viewFields.map(function (viewField) {
                        var field = listFields.filter(function (listField) {
                            return listField.InternalName == viewField;
                        })[0];
                        return field;
                    });

                    return viewFields;
                })

        }

        /*Get all list fields */
        function getListFields(siteUrl, listTitle) {
            var listFieldsUrl = concatUrls(siteUrl, "/_api/web/lists/getByTitle('" + listTitle + "')/fields");
            $log.info(listFieldsUrl);
            return $http({
                url: listFieldsUrl,
                method: 'GET',
                headers: { accept: 'application/json;odata=verbose' }
            })
                .then(function (results) {
                    return results.data.d.results.map(cleanupField);
                });
        }

        function getAllItems(siteUrl, listTitle) {
            var itemsUrl = concatUrls(siteUrl, '/_api/web/lists/');
            itemsUrl = concatUrls(itemsUrl, "getByTitle('" + listTitle + "')/items");
            $log.info(itemsUrl);
            var getItemsUrl = {
                url: itemsUrl,
                method: 'GET',
                headers: {
                    accept: 'application/json;odata=verbose'
                }
            };

            return $http(getItemsUrl)
                .then(function (response) {
                    return response.data.d.results.map;
                });
        }
    }
})();
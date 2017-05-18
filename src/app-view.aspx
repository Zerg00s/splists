<!DOCTYPE html>
<html lang="en">
    <head>
        <title>splists - sandbox</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="style.css" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js"></script>
        <script src='splists-module.js'>  </script>
        <script src='splists-factory.js'>  </script>
        <script src='app-module.js'>  </script>
    </head>
    <body ng-app="app" ng-controller="AppController as app"> 
        <h2>{{app.message}}</h2>
            <!--<splist site-url='/sd/' list-title='Client Servers' page-size='10' view-title='Client Servers - HomePage'></splist>-->
            <!--<splist site-url='/sd/' list-title='SampleList' page-size='1' view-title='All Items'></splist>-->
            <splist site-url='/sd/' list-title='Client Pictures' page-size='10' view-title='All Pictures'></splist>
    </body>
</html>

<!--https://jolera365.sharepoint.com/sd/_catalogs/masterpage/splists/app-view.aspx-->
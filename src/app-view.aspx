<!DOCTYPE html>
<html lang="en">

<head>
    <title>splists - sandbox</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
    <link rel="stylesheet" href="lib/select.min.css">
    <link rel="stylesheet" href="lib/ui-grid.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-sanitize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-animate.min.js"></script>
    <script src='splists-module.js'></script>

    <script src='splists-factory.js'></script>
    <script src="lib/ui-grid.min.js"></script>
    <script src="lib/select.min.js"></script>
    <script src='app-module.js'>

    </script>
</head>

<body ng-app="app" ng-controller="AppController as app">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <list-item-select site-url='/sd/' list-title='Client List' 
            selected-item='app.item'></list-item-select>
        </div> 
        <div style="margin:20px;">
            <splist site-url='/sd/' 
                    list-title='Client Servers'  
                    view-title='Client Servers - HomePage'
                    lookup-field='Client_x0020_Name' lookup-id='app.item.ID' 
                    ></splist>
            <splist site-url='/sites/demo/Kiosk/' list-title='Signins'  view-title='All Items'></splist>

            <!--<splist site-url='/sd/' list-title='SampleList' page-size='2' view-title='All Items'></splist>
            <splist site-url='/sd/' list-title='Client Pictures' page-size='2' view-title='All Pictures'></splist>
            <splist site-url='/sd/' list-title='Primary Contact' page-size='2' view-title='All Items'></splist>-->

        </div>
    </div>


</body>

</html>

<!--https://jolera365.sharepoint.com/sd/_catalogs/masterpage/splists/app-view.aspx-->
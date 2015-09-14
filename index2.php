<!DOCTYPE html>
<html>
<head>
    <title>My Sample Project</title>
    <link rel="stylesheet" href="static/components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="static/components/bootstrap/dist/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="static/css/style.css">
    <script data-main="static/scripts/init" src="static/components/requirejs/require.js"></script>
</head>
<body>
<h1>TinyMCE test</h1>

<div id="global-errors"></div>

<form action="post.php" method="post" autocomplete="off">

    <textarea name="description" id="Description">1231 1321 3d hsgdh f</textarea>



    <button type="submit" class="btn btn-primary">submit</button>
</form>


<script>
    window.appExternalData = {
        controller: 'controllers/EditorController'
    };
</script>
</body>
</html>
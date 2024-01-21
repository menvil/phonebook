<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Phone Book App</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    @vite("resources/css/app.css")
</head>
<body class="antialiased bg-gray-100 p-2">
    @vite('resources/js/users/index.js')
    <div id="app" class="sm:flex sm:justify-center py-28 bg-dots-darker bg-center dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-4 lg:w-1/5 min-w-96">
            <div class="font-bold text-3xl text-center">Phone Book App</div>
            <quick-search></quick-search>
            <users-table></users-table>
        </div>
    </div>
</body>
</html>

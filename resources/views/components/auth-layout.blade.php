@props(['title' => 'Authentication'])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title }} - {{ config('app.name', 'DataATE') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/auth.css') }}">
</head>
<body>
    <!-- Back to Home Link -->
    <a href="{{ url('/') }}" class="back-home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
        Back to Home
    </a>

    <div class="auth-container">
        <div class="auth-card">
            <!-- Logo -->
            <div class="auth-logo">
                <a href="{{ url('/') }}">
                    <img src="{{ asset('image/logo.png') }}" alt="DataATE Logo">
                </a>
            </div>

            <!-- Tab Switcher -->
            <div class="auth-tabs">
                <a href="{{ route('login') }}" class="auth-tab {{ request()->routeIs('login') ? 'active' : '' }}">Login</a>
                <a href="{{ route('register') }}" class="auth-tab {{ request()->routeIs('register') ? 'active' : '' }}">Sign Up</a>
            </div>

            <!-- Content -->
            {{ $slot }}
        </div>
    </div>
</body>
</html>


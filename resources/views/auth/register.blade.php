<x-auth-layout>
    <x-slot name="title">Sign Up</x-slot>

    <form method="POST" action="{{ route('register') }}" class="auth-form">
        @csrf

        <!-- Name -->
        <div class="input-group">
            <input 
                id="name" 
                type="text" 
                name="name" 
                value="{{ old('name') }}" 
                placeholder="Full Name" 
                required 
                autofocus 
                autocomplete="name"
            >
            @error('name')
                <div class="input-error">{{ $message }}</div>
            @enderror
        </div>

        <!-- Email -->
        <div class="input-group">
            <input 
                id="email" 
                type="email" 
                name="email" 
                value="{{ old('email') }}" 
                placeholder="Email Address" 
                required 
                autocomplete="username"
            >
            @error('email')
                <div class="input-error">{{ $message }}</div>
            @enderror
        </div>

        <!-- Password -->
        <div class="input-group">
            <input 
                id="password" 
                type="password" 
                name="password" 
                placeholder="Password" 
                required 
                autocomplete="new-password"
            >
            @error('password')
                <div class="input-error">{{ $message }}</div>
            @enderror
        </div>

        <!-- Confirm Password -->
        <div class="input-group">
            <input 
                id="password_confirmation" 
                type="password" 
                name="password_confirmation" 
                placeholder="Confirm Password" 
                required 
                autocomplete="new-password"
            >
            @error('password_confirmation')
                <div class="input-error">{{ $message }}</div>
            @enderror
        </div>

        <!-- Submit Button -->
        <button type="submit" class="auth-btn">Sign Up</button>

        <!-- Already registered -->
        <div class="auth-footer">
            Already have an account? <a href="{{ route('login') }}">Login</a>
        </div>
    </form>
</x-auth-layout>

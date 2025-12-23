<x-auth-layout>
    <x-slot name="title">Forgot Password</x-slot>

    <div class="forgot-description" style="color: rgba(0,0,0,0.6); font-size: 14px; margin-bottom: 20px; text-align: center; line-height: 1.5;">
        Forgot your password? No problem. Just enter your email address and we'll send you a password reset link.
    </div>

    <!-- Session Status -->
    @if (session('status'))
        <div class="session-status">
            {{ session('status') }}
        </div>
    @endif

    <form method="POST" action="{{ route('password.email') }}" class="auth-form">
        @csrf

        <!-- Email -->
        <div class="input-group">
            <input 
                id="email" 
                type="email" 
                name="email" 
                value="{{ old('email') }}" 
                placeholder="Email Address" 
                required 
                autofocus
            >
            @error('email')
                <div class="input-error">{{ $message }}</div>
            @enderror
        </div>

        <!-- Submit Button -->
        <button type="submit" class="auth-btn">Send Reset Link</button>

        <!-- Back to Login -->
        <div class="auth-footer">
            Remember your password? <a href="{{ route('login') }}">Login</a>
        </div>
    </form>
</x-auth-layout>

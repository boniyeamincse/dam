<x-guest-layout>
    <x-slot name="head">
        <title>Log in</title>
    </x-slot>

    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <!-- Animated Background Elements -->
        <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full blur-3xl" style="animation-delay: 2s"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-indigo-400/10 rounded-full blur-3xl" style="animation-delay: 4s"></div>
        </div>

        <div class="max-w-md w-full space-y-8 relative z-10">
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
                <!-- Logo and Title -->
                <div class="text-center mb-8">
                    <div class="flex justify-center mb-4">
                        <!-- Logo - will show placeholder if logo.png doesn't exist -->
                        <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {{-- If public/logo.png exists, uncomment below and remove this div --}}
                            {{-- <img src="{{ asset('logo.png') }}" alt="Akij Group Logo" class="w-20 h-20 rounded-full" /> --}}
                            AKIJ
                        </div>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">
                        Akij Group Assets Management
                    </h1>
                    <p class="text-sm text-gray-600">
                        Secure Sign In
                    </p>
                </div>

                @if (session('status'))
                    <div class="mb-4 text-sm font-medium text-green-600 text-center">
                        {{ session('status') }}
                    </div>
                @endif

                <form method="POST" action="{{ route('login') }}" class="space-y-6">
                    @csrf

                    <div>
                        <x-input-label for="email" :value="__('Email')" class="text-gray-700" />
                        <x-text-input id="email" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                      type="email"
                                      name="email"
                                      :value="old('email')"
                                      required autofocus autocomplete="username" />
                        <x-input-error :messages="$errors->get('email')" class="mt-2 text-red-600" />
                    </div>

                    <div>
                        <x-input-label for="password" :value="__('Password')" class="text-gray-700" />
                        <x-text-input id="password" class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                      type="password"
                                      name="password"
                                      required autocomplete="current-password" />
                        <x-input-error :messages="$errors->get('password')" class="mt-2 text-red-600" />
                    </div>

                    <div class="flex items-center justify-between">
                        <label for="remember_me" class="inline-flex items-center cursor-pointer">
                            <input id="remember_me" type="checkbox"
                                   class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                   name="remember">
                            <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
                        </label>

                        @if (Route::has('password.request'))
                            <a class="text-sm text-indigo-600 hover:text-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                               href="{{ route('password.request') }}">
                                {{ __('Forgot your password?') }}
                            </a>
                        @endif
                    </div>

                    <div>
                        <x-primary-button class="w-full justify-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500">
                            {{ __('Sign In') }}
                        </x-primary-button>
                    </div>
                </form>
            </div>

            <!-- Footer -->
            <div class="text-center text-sm text-gray-500">
                © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
            </div>
        </div>
    </div>
</x-guest-layout>
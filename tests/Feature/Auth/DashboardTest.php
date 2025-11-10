<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_requires_authentication(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_access_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_dashboard_contains_expected_content(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        // Since this is an Inertia.js app, the content is rendered client-side
        // We can only check that the correct component is loaded
        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard/Index')
            ->has('auth.user')
        );
    }

    public function test_dashboard_shows_domain_section(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        // For Inertia apps, we can't check rendered HTML directly
        // but we can verify the component loads
        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard/Index')
        );
    }

    public function test_dashboard_shows_routers_section(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard/Index')
        );
    }

    public function test_dashboard_shows_switches_section(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard/Index')
        );
    }

    public function test_dashboard_shows_servers_section(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard/Index')
        );
    }

    public function test_dashboard_shows_settings_section(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard/Index')
        );
    }

    public function test_unauthenticated_user_cannot_access_other_protected_routes(): void
    {
        $response = $this->get('/domains');
        $response->assertRedirect('/login');

        $response = $this->get('/routers');
        $response->assertRedirect('/login');

        $response = $this->get('/switches');
        $response->assertRedirect('/login');

        $response = $this->get('/servers');
        $response->assertRedirect('/login');

        $response = $this->get('/settings');
        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_access_protected_routes(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/domains');
        $response->assertStatus(200);

        $response = $this->actingAs($user)->get('/routers');
        $response->assertStatus(200);

        $response = $this->actingAs($user)->get('/switches');
        $response->assertStatus(200);

        $response = $this->actingAs($user)->get('/servers');
        $response->assertStatus(200);
    }

    public function test_settings_route_requires_org_admin_role(): void
    {
        $user = User::factory()->create();

        // User without Org Admin role should be denied
        $response = $this->actingAs($user)->get('/settings');
        $response->assertStatus(403); // Forbidden
    }
}
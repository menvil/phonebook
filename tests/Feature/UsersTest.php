<?php

namespace Tests\Feature;

use App\Http\Resources\UserResource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\Request;
class UsersTest extends TestCase
{

    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_users_list_is_fetched()
    {
        // Arrange
        User::factory(3)->create();
        $userResource = UserResource::collection(User::all());
        $request = Request::create('/api/users', 'GET');

        // Act
        $response = $this->getJson('/api/users');

        // Assert
        $response->assertStatus(200)->assertJson(
            $userResource->response($request)->getData(true)
        );
    }

    public function test_user_can_be_created()
    {
        // Arrange
        $user = User::factory()->make();

        // Act
        $response = $this->withoutExceptionHandling()->postJson('/api/users', $user->toArray());

        // Assert
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', $user->toArray());
    }

    public function test_users_are_fetched_after_user_is_created()
    {
        // Arrange
        $user = User::factory()->make();
        $request = Request::create('/api/users', 'POST');

        // Act
        $response = $this->withoutExceptionHandling()->postJson('/api/users', $user->toArray());

        // Assert
        $userResource = UserResource::collection(User::all());

        $this->assertDatabaseHas('users', $user->toArray());

        $response->assertStatus(200)->assertJson(
            $userResource->response($request)->getData(true)
        );
    }

    public function test_users_can_be_updated()
    {
        $user = User::factory()->create();
        $updatedUser = [
            'first_name' => 'updated first name',
            'last_name' => 'updated last name',
            'phone' => '123456',
        ];
        $request = Request::create("/api/users/{$user->id}", 'PUT');

        $response = $this->withoutExceptionHandling()->putJson("/api/users/{$user->id}", $updatedUser);

        $userResource = UserResource::collection(User::all());
        $this->assertDatabaseHas('users', ['id' => $user->id, ...$updatedUser]);
        $response->assertStatus(200)->assertJson(
            $userResource->response($request)->getData(true)
        );
    }


    /**
     * @dataProvider provideBadUserData
     */
    public function test_update_user_validation($missing, $user)
    {
        $userId = User::factory()->create()->id;

        $response = $this->putJson("/api/users/{$userId}", $user);
        $response->assertJsonValidationErrors([$missing]);
    }


    /**
     * @dataProvider provideBadUserData
     */
    public function test_create_user_validation($missing, $user)
    {
        $response = $this->postJson('/api/users', $user);
        $response->assertJsonValidationErrors([$missing]);
    }

    public function test_users_can_be_deleted()
    {
        $userId = User::factory()->create()->id;
        $request = Request::create("/api/users/{$userId}", 'DELETE');

        $response = $this->withoutExceptionHandling()->deleteJson("/api/users/{$userId}");

        $this->assertDatabaseMissing('users', [
            'id' => $userId
        ]);
        $userResource = UserResource::collection(User::all());
        $response->assertStatus(200)->assertJson(
            $userResource->response($request)->getData(true)
        );
    }

    public static function provideBadUserData(): array
    {
        $user = User::factory()->make();
        return [
            'missing first name' => [
                'first_name',
                [
                    ...$user->toArray(),
                    'first_name' => null,
                ]
            ],
            'missing last name' => [
                'last_name',
                [
                    ...$user->toArray(),
                    'last_name' => null
                ]
            ],
            'missing phone' => [
                'phone',
                [
                    ...$user->toArray(),
                    'phone' => null
                ]
            ]
        ];
    }
}

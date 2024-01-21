<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UsersApiController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return UserResource::collection(User::all());
    }

    /**
     * Delete the specified user.
     *
     * @param Request $request
     * @param User $user
     * @return AnonymousResourceCollection
     */
    public function destroy(Request $request, User $user): AnonymousResourceCollection
    {
        $user->delete();
        return UserResource::collection(User::all());
    }

    /**
     * Update the specified user.
     *
     * @param UserRequest $request
     * @param User $user
     * @return AnonymousResourceCollection
     */
    public function update(UserRequest $request, User $user): AnonymousResourceCollection
    {
        $user->update($request->only('first_name', 'last_name', 'phone'));
        return UserResource::collection(User::all());
    }

    /**
     * Store a newly created user.
     *
     * @param UserRequest $request
     * @return AnonymousResourceCollection
     */
    public function store(UserRequest $request): AnonymousResourceCollection
    {
        User::create($request->only('first_name', 'last_name', 'phone'));
        return UserResource::collection(User::all());
    }
}

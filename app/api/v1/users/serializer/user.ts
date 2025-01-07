export const UserSerializer = (user: any) : any => {
    return {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone_number: user.phoneNumber,
        account_type: user.accountType,
        role: user.role,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        preferences: user?.preferences || ["fictional", "non-fictional", "academic"]
    }
}

export const UserListSerializer = (users: any[]) : any[] => {
    return users.map(user => UserSerializer(user))
}

export function validate(username: string, password: string) {
    let errors: { username?: string; password?: string } = {};

    if (!username) {
        errors.username = "Username is required.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }

    return Object.keys(errors).length ? errors : null;
}

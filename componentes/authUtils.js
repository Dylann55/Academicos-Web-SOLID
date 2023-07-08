class AuthUtils {
    isAuthenticated(data) {
      throw new Error('isAuthenticated method not implemented');
    }
  }
  
class SupaBaseAuthUtils extends AuthUtils {
    isAuthenticated(data) {
      return data && data.result.data.session.user.aud === 'authenticated';
    }
  }

export { SupaBaseAuthUtils as AuthenticationService };
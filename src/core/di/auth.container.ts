import { AuthDataSourceImpl } from '@/features/auth/data/datasources/auth.datasource.impl'
import { AuthRepositoryImpl } from '@/features/auth/data/repositories/auth.repository.impl'
import { LoginUseCase } from '@/features/auth/domain/usecases/login.usecase'
import { RegisterUseCase } from '@/features/auth/domain/usecases/register.usecase'

// Dependency Injection Container for Auth Feature
class AuthContainer {
  private static instance: AuthContainer

  // Data layer
  private readonly _authDataSource: AuthDataSourceImpl
  private readonly _authRepository: AuthRepositoryImpl

  // Domain layer
  private readonly _loginUseCase: LoginUseCase
  private readonly _registerUseCase: RegisterUseCase

  private constructor() {
    // Initialize data layer
    this._authDataSource = new AuthDataSourceImpl()
    this._authRepository = new AuthRepositoryImpl(this._authDataSource)

    // Initialize domain layer
    this._loginUseCase = new LoginUseCase(this._authRepository)
    this._registerUseCase = new RegisterUseCase(this._authRepository)
  }

  public static getInstance(): AuthContainer {
    if (!AuthContainer.instance) {
      AuthContainer.instance = new AuthContainer()
    }
    return AuthContainer.instance
  }

  // Getters for use cases
  public get loginUseCase(): LoginUseCase {
    return this._loginUseCase
  }

  public get registerUseCase(): RegisterUseCase {
    return this._registerUseCase
  }

  // Getters for repositories (if needed for testing)
  public get authRepository(): AuthRepositoryImpl {
    return this._authRepository
  }
}

export const authContainer = AuthContainer.getInstance()

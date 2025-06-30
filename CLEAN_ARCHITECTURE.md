# 🏗️ Clean Architecture Implementation

Dự án này đã được cấu trúc lại theo mô hình **Clean Architecture** để đảm bảo tính bảo trì, kiểm thử và mở rộng.

## 📁 Cấu trúc Feature-based Architecture

```
src/
├── features/                    # Features theo Clean Architecture
│   └── auth/                   # Auth Feature
│       ├── domain/             # Domain Layer (Business Logic)
│       │   ├── entities/       # Domain Entities
│       │   ├── repositories/   # Repository Interfaces
│       │   └── usecases/       # Use Cases (Business Rules)
│       ├── data/               # Data Layer (External Interfaces)
│       │   ├── repositories/   # Repository Implementations
│       │   └── datasources/    # Data Sources (API, Local, etc.)
│       └── presentation/       # Presentation Layer (UI)
│           ├── components/     # UI Components
│           └── hooks/          # React Hooks
├── core/                       # Shared Core
│   ├── di/                     # Dependency Injection
│   ├── services/               # External Services
│   ├── store/                  # Global State Management
│   └── shared/                 # Shared Utilities
└── pages/                      # Pages (sử dụng features)
```

## 🔄 Clean Architecture Layers

### 1. **Domain Layer** (Innermost - Business Logic)

- **Entities**: Các đối tượng nghiệp vụ core
- **Use Cases**: Logic nghiệp vụ và quy tắc kinh doanh
- **Repository Interfaces**: Contracts cho data access

```typescript
// Example: AuthEntity
export class AuthEntity {
  constructor(
    public readonly user: User,
    public readonly tokens: AuthTokens,
    public readonly isAuthenticated: boolean = true
  ) {}

  isAdmin(): boolean {
    return this.user.role === 'admin'
  }
}
```

### 2. **Data Layer** (Infrastructure)

- **Repository Implementations**: Triển khai repository interfaces
- **Data Sources**: API clients, local storage, etc.

```typescript
// Example: AuthRepositoryImpl
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly authDataSource: IAuthDataSource) {}

  async login(credentials: LoginCredentials): Promise<AuthEntity> {
    const response = await this.authDataSource.login(credentials)
    return AuthEntity.fromResponse(response)
  }
}
```

### 3. **Presentation Layer** (UI)

- **Components**: React components
- **Hooks**: Custom hooks cho presentation logic

```typescript
// Example: useLoginAuth hook
export const useLoginAuth = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return await authContainer.loginUseCase.execute(credentials)
    }
  })
}
```

## 🔧 Dependency Injection

Sử dụng **DI Container** để quản lý dependencies:

```typescript
// AuthContainer
class AuthContainer {
  private readonly _loginUseCase: LoginUseCase

  constructor() {
    const dataSource = new AuthDataSourceImpl()
    const repository = new AuthRepositoryImpl(dataSource)
    this._loginUseCase = new LoginUseCase(repository)
  }

  get loginUseCase(): LoginUseCase {
    return this._loginUseCase
  }
}

export const authContainer = AuthContainer.getInstance()
```

## ✅ Lợi ích của Clean Architecture

### 🎯 **Separation of Concerns**

- Mỗi layer có trách nhiệm riêng biệt
- Domain logic độc lập với UI và infrastructure
- Dễ dàng thay đổi implementation

### 🧪 **Testability**

- Domain logic có thể test độc lập
- Mock dependencies dễ dàng
- Unit tests reliable và fast

### 🔄 **Maintainability**

- Code structure rõ ràng và nhất quán
- Dễ dàng locate và fix bugs
- Onboarding developers mới nhanh chóng

### 📈 **Scalability**

- Thêm features mới theo pattern nhất quán
- Horizontal scaling theo features
- Vertical scaling theo layers

## 🚀 Cách sử dụng

### 1. Sử dụng trong Components:

```typescript
import { LoginForm } from '@/features/auth'

// Component đã được tách biệt presentation logic
<LoginForm onSuccess={() => navigate('/dashboard')} />
```

### 2. Sử dụng Use Cases:

```typescript
import { authContainer } from '@/features/auth'

// Sử dụng business logic trực tiếp
const result = await authContainer.loginUseCase.execute(credentials)
```

### 3. State Management:

```typescript
import { useAuthUser, useAuthActions } from '@/core/store/features/auth/authStore'

// Selector hooks for better performance
const user = useAuthUser()
const { logout } = useAuthActions()
```

## 🔄 Migration từ Legacy Code

Dự án đã được migrate từ cấu trúc legacy sang Clean Architecture:

1. ✅ **Auth Feature** - Hoàn thành clean architecture
2. 🔄 **Profile Feature** - Đang migration
3. 📋 **Admin Features** - Planned

## 📚 Tài liệu tham khảo

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Clean Architecture](https://github.com/dev-mastery/comments-api)
- [Feature-based Architecture](https://feature-sliced.design/)

---

**🎉 Clean Architecture giúp code base trở nên maintainable, testable và scalable hơn!**

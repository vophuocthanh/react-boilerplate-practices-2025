# 🔄 Migration Guide to Clean Architecture

Hướng dẫn migrate các features từ legacy structure sang Clean Architecture.

## 📋 Migration Checklist

### ✅ Completed Features

- [x] **Auth Feature** - Fully migrated to Clean Architecture

### 🔄 In Progress Features

- [ ] **Profile Feature**
- [ ] **Admin Dashboard**
- [ ] **User Management**

### 📝 Planned Features

- [ ] **File Upload**
- [ ] **Notifications**

## 🏗️ Migration Steps

### Step 1: Tạo cấu trúc Feature

```bash
src/features/[feature-name]/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── data/
│   ├── repositories/
│   └── datasources/
└── presentation/
    ├── components/
    └── hooks/
```

### Step 2: Migrate Domain Layer

#### 2.1 Tạo Entities

```typescript
// src/features/profile/domain/entities/profile.entity.ts
export class ProfileEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly avatar?: string
  ) {}

  getDisplayName(): string {
    return this.name || this.email
  }
}
```

#### 2.2 Tạo Repository Interfaces

```typescript
// src/features/profile/domain/repositories/profile.repository.ts
export interface IProfileRepository {
  getProfile(id: string): Promise<ProfileEntity>
  updateProfile(id: string, data: Partial<ProfileEntity>): Promise<ProfileEntity>
}
```

#### 2.3 Tạo Use Cases

```typescript
// src/features/profile/domain/usecases/update-profile.usecase.ts
export class UpdateProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(id: string, data: Partial<ProfileEntity>): Promise<ProfileEntity> {
    this.validateData(data)
    return await this.profileRepository.updateProfile(id, data)
  }

  private validateData(data: Partial<ProfileEntity>): void {
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format')
    }
  }
}
```

### Step 3: Migrate Data Layer

#### 3.1 Tạo Data Sources

```typescript
// src/features/profile/data/datasources/profile.datasource.impl.ts
export class ProfileDataSourceImpl implements IProfileDataSource {
  async getProfile(id: string): Promise<ProfileResponse> {
    return await profileApi.getProfile(id)
  }
}
```

#### 3.2 Tạo Repository Implementation

```typescript
// src/features/profile/data/repositories/profile.repository.impl.ts
export class ProfileRepositoryImpl implements IProfileRepository {
  constructor(private readonly dataSource: IProfileDataSource) {}

  async getProfile(id: string): Promise<ProfileEntity> {
    const response = await this.dataSource.getProfile(id)
    return ProfileEntity.fromResponse(response)
  }
}
```

### Step 4: Migrate Presentation Layer

#### 4.1 Tạo DI Container

```typescript
// src/core/di/profile.container.ts
class ProfileContainer {
  private readonly _updateProfileUseCase: UpdateProfileUseCase

  constructor() {
    const dataSource = new ProfileDataSourceImpl()
    const repository = new ProfileRepositoryImpl(dataSource)
    this._updateProfileUseCase = new UpdateProfileUseCase(repository)
  }

  get updateProfileUseCase(): UpdateProfileUseCase {
    return this._updateProfileUseCase
  }
}
```

#### 4.2 Migrate Hooks

```typescript
// src/features/profile/presentation/hooks/use-profile.hook.ts
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      return await profileContainer.updateProfileUseCase.execute(data.id, data)
    }
  })
}
```

#### 4.3 Migrate Components

```typescript
// src/features/profile/presentation/components/profile-form.component.tsx
const ProfileForm = () => {
  const { mutate: updateProfile } = useUpdateProfile()

  const handleSubmit = (data: ProfileFormData) => {
    updateProfile(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

### Step 5: Update Page Components

#### 5.1 Refactor Page

```typescript
// src/pages/profile/Profile.tsx
import { ProfileForm } from '@/features/profile'

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm />
    </div>
  )
}
```

## 🔧 Migration Tips

### ✅ Do's

- **Start with domain layer** - Entities and Use Cases first
- **Keep existing APIs** - Don't break existing functionality
- **Gradual migration** - Migrate one feature at a time
- **Write tests** - Add tests for each layer
- **Update documentation** - Keep docs up to date

### ❌ Don'ts

- **Don't break existing code** - Maintain backward compatibility
- **Don't mix layers** - Keep clean separation
- **Don't over-engineer** - Start simple, refactor when needed
- **Don't forget exports** - Update index files

## 📊 Migration Progress

### Auth Feature (✅ Completed)

- [x] Domain entities
- [x] Use cases
- [x] Repository pattern
- [x] DI Container
- [x] Clean hooks
- [x] Clean components

### Profile Feature (🔄 In Progress)

- [ ] Domain entities
- [ ] Use cases
- [ ] Repository pattern
- [ ] DI Container
- [ ] Clean hooks
- [ ] Clean components

## 🚀 Next Steps

1. **Migrate Profile Feature** next
2. **Add integration tests** for each feature
3. **Create shared utilities** for common patterns
4. **Add performance monitoring** for clean architecture
5. **Create development guidelines** for team

## 📚 Resources

- [Clean Architecture Examples](./CLEAN_ARCHITECTURE.md)
- [Feature Structure Template](./src/features/auth/)
- [DI Container Pattern](./src/core/di/)

---

**🎯 Mục tiêu: Migrate hoàn toàn sang Clean Architecture trong 2-3 sprints tới!**

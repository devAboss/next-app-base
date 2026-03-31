# 개발 가이드라인 및 규칙

## 모든 계획과 응답 메시지는 한국어로 답변해주세요.

## ⚠️ UI 컴포넌트 필수 규칙
**UI 구성이 필요한 경우 shadcn/ui 컴포넌트 필수 사용**
- 모든 UI 컴포넌트는 shadcn/ui에서 우선 검색 후 사용
- shadcn/ui에 없는 경우에만 Radix UI 또는 Base UI 직접 구현
- 일관된 디자인 시스템 유지

## 프로젝트 개요
- **프레임워크**: Next.js 16.2.1 (App Router)
- **언어**: TypeScript 6.0.2
- **스타일링**: Tailwind CSS 4.2.2
- **상태 관리**: Zustand 5.0.12, TanStack Query 5.95.2
- **UI 라이브러리**: Base UI, Radix UI, shadcn/ui
- **인증**: better-auth 1.5.6
- **API**: tRPC 11.16.0
- **데이터베이스**: Prisma 7.6.0
- **폼 관리**: React Hook Form 7.72.0 + Zod 4.3.6

---

## 핵심 개발 원칙

### 1. 타입 안전성
- **Zod**: 런타임 검증 스키마
- **tRPC**: 타입 안전한 API 통신 (superjson으로 직렬화)
- **TypeScript**: 엄격 모드 사용

### 2. 성능 최적화
- **TanStack Query**: 서버 상태 캐싱 (staleTime: 5분)
- **React 19**: 서버 컴포넌트 우선
- **client-only/server-only**: 경계 명확화

### 3. 접근성
- Radix UI, Base UI의 내장 접근성 활용
- ARIA 속성, 키보드 네비게이션 지원

### 4. MCP 도구 활용 (생산성)
- **next-devtools**: 런타임 진단, 에러 확인
- **prisma-local**: 스키마, 마이그레이션 자동화
- **shadcn**: 컴포넌트 추가, 예제 코드
- **tailwindcss-server**: 클래스 검색, CSS 변환

### 5. 일관성 유지
- **UI 컴포넌트**: shadcn/ui 필수 사용, 없을 경우에만 Radix UI/Base UI
- **파일 명명**: PascalCase(컴포넌트), camelCase(훅), kebab-case(유틸리티)
- **코드 스타일**: Tailwind CSS, TypeScript 엄격 모드, 정의된 라이브러리 패턴 준수
- **규칙 준수**: 이 문서에 명시된 모든 규칙은 필수 사항으로 반드시 따라야 함

---

## MCP 기반 개발 가이드

### MCP 서버 개요
AI가 MCP 도구를 직접 호출하여 개발 작업을 자동화합니다.

### 프로젝트에서 사용되는 핵심 MCP 서버
| MCP 서버 | 역할 |
|----------|------|
| **next-devtools** | Next.js 런타임 진단, 에러 확인, 라우트 분석 |
| **prisma-local** | DB 스키마 관리, 마이그레이션, Prisma Studio |
| **shadcn** | UI 컴포넌트 검색, 추가, 예제 코드 확인 |
| **tailwindcss-server** | 유틸리티 검색, 색상 팔레트 생성, CSS 변환 |
| **serena** | 코드베이스 분석, 심볼 검색, 코드 편집 |
| **better-auth** | 인증 시스템 구현 가이드 |

### 1. next-devtools
런타임 진단, 에러 확인, 라우트 분석
- **기능**: nextjs_index, nextjs_call, nextjs_docs, browser_eval

### 2. prisma-local
스키마 관리, 마이그레이션, Prisma Studio 실행
- **기능**: Prisma-Studio, migrate-dev, migrate-reset, migrate-status

### 3. shadcn
컴포넌트 검색, 추가, 예제 코드 확인
- **기능**: search_items_in_registries, get_add_command_for_items, get_item_examples_from_registries

### 4. tailwindcss-server
유틸리티 검색, 색상 팔레트 생성, CSS 변환
- **기능**: get_tailwind_utilities, generate_color_palette, convert_css_to_tailwind

### 5. serena
코드베이스 분석, 심볼 기반 편집
- **기능**: find_symbol, get_symbols_overview, search_for_pattern, replace_symbol_body

### 6. better-auth
인증 시스템 구현 가이드 및 문서
- **기능**: chat, search, list_files, get_file

### MCP 활용 프롬프트 예시 (사용자 참고용)
사용자가 AI에게 MCP 기능을 활용하여 작업을 요청할 때 참고하세요.
```bash
✅ 좋은 예시:
"Prisma로 User 모델에 emailVerified 필드를 추가해줘"
"shadcn으로 로그인 폼을 만들어주고, Tailwind로 스타일링해줘"
"next-devtools로 현재 페이지의 에러를 확인해줘"

❌ 피해야 할 예시:
"컴포넌트 만들어줘" (너무 모호함)
```

---

## 아키텍처

### 폴더 구조
```
├── app/              # Next.js App Router (서버 컴포넌트)
│   ├── api/          # API Routes
│   └── (auth)/       # 인증 그룹
├── components/       # 재사용 컴포넌트
│   └── ui/          # shadcn/ui 컴포넌트
├── lib/             # 유틸리티, auth, trpc-client
├── server/          # tRPC 라우터
├── prisma/          # schema.prisma, seed.ts
└── public/          # 정적 파일
```

### 컴포넌트 원칙
1. **서버 컴포넌트 우선**: 기본값
2. **클라이언트 컴포넌트**: `'use client'` 명시
3. **컴포지션**: 작은 컴포넌트 조합
4. **코드 분할**: `dynamic()` 사용

---

## 핵심 라이브러리 사용법

### React Hook Form + Zod
```typescript
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해주세요' }),
  password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다' })
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  )
}
```

### TanStack Query
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// Query 클라이언트 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분 캐시
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// 데이터 조회
function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => await trpc.posts.list.query(),
    onError: () => toast.error('포스트 목록을 불러오는데 실패했습니다')
  })
}

// 데이터 생성
function useCreatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { title: string; content: string }) => 
      trpc.posts.create.mutate(data),
    onSuccess: () => {
      toast.success('포스트가 생성되었습니다')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
```

### tRPC + superjson
```typescript
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.create({
  transformer: superjson, // Date, BigInt 직렬화
})

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => ({ greeting: `Hello ${input.name}` })),
  
  posts: t.router({
    list: t.procedure.query(async ({ ctx }) => {
      return ctx.prisma.post.findMany()
    }),
    create: t.procedure
      .input(z.object({ title: z.string(), content: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return ctx.prisma.post.create({
          data: { ...input, authorId: ctx.session.user.id }
        })
      }),
  }),
})

export type AppRouter = typeof appRouter

// 클라이언트 설정
import { createTRPCReact } from '@trpc/react-query'
export const trpc = createTRPCReact<AppRouter>()
```

### Zustand (클라이언트 상태)
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BearStore {
  bears: number
  increase: (by: number) => void
  reset: () => void
}

export const useBearStore = create<BearStore>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  reset: () => set({ bears: 0 })
}))

// 지속성 있는 스토어
export const usePersistentStore = create(
  persist(
    (set) => ({
      bears: 0,
      increase: () => set((state) => ({ bears: state.bears + 1 })),
      reset: () => set({ bears: 0 })
    }),
    { name: 'bear-storage' }
  )
)
```

### better-auth
```typescript
import { betterAuth } from "better-auth"
import { prisma } from "./prisma"

export const auth = betterAuth({
  database: prisma,
  emailAndPassword: { 
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7일
    updateAge: 60 * 60 * 24, // 24시간마다 업데이트
  }
})

// 서버에서 세션 가져오기
export const serverAuth = {
  getSession: async () => {
    return await auth.api.getSession({ headers: await headers() })
  },
  requireAuth: async () => {
    const session = await serverAuth.getSession()
    if (!session) throw new Error("인증이 필요합니다")
    return session
  }
}

// 클라이언트에서 사용
import { authClient } from "@/lib/auth-client"

const handleLogin = async () => {
  const result = await authClient.signIn.email({
    email: "user@example.com",
    password: "password123"
  })
  if (result.error) throw new Error(result.error.message)
  toast.success("로그인 성공")
}
```

---

## 스타일링

### Tailwind CSS + cn 유틸리티
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 사용 예시
function Card({ isActive }) {
  return (
    <div className={cn(
      'p-4 rounded-lg border',
      isActive && 'border-blue-500 bg-blue-50'
    )}>
      카드 내용
    </div>
  )
}
```

### CVA (컴포넌트 변형)
```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-gray-300 bg-transparent',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
  }
)

function Button({ variant, size, className, ...props }) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
```

### shadcn/ui 컴포넌트
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function FormCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>폼 제목</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="example@email.com" />
        </div>
        <Button className="w-full">제출</Button>
      </CardContent>
    </Card>
  )
}
```

### Radix UI / Base UI
- shadcn/ui에 없는 컴포넌트만 직접 구현
- 접근성이 이미 내장되어 있음
- **Base UI 사용 시 shadcn 패턴으로 래핑하여 일관성 유지**:
```typescript
// components/ui/slider.tsx (Base UI 래핑 예시)
import { Slider } from '@base-ui/react/Slider'
import { cn } from '@/lib/utils'

export function Slider({ className, ...props }) {
  return (
    <Slider
      className={cn(
        'relative w-64 h-2 bg-gray-200 rounded-full',
        className
      )}
      {...props}
    />
  )
}
```
- 상세 예제는 각 라이브러리 공식 문서 참고

### Lucide 아이콘
```typescript
import { User, Settings, Search } from 'lucide-react'

<User className="h-5 w-5" />
<Settings className="h-5 w-5 text-gray-500" />
<Search className="h-4 w-4 text-blue-600" />
```

### Sonner 토스트
```typescript
import { toast } from 'sonner'

toast.success('성공!', { description: '작업이 완료되었습니다' })
toast.error('오류!', { description: '작업에 실패했습니다' })
toast.loading('로딩 중...', { id: 'unique-id' })
toast.success('완료!', { id: 'unique-id' })
```

### 테마 (next-themes)
```typescript
'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}

// app/layout.tsx에 ThemeProvider 추가
import { ThemeProvider } from 'next-themes'
export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class" defaultTheme="system">{children}</ThemeProvider>
}
```

---

## 코딩 규칙

### 파일 명명
- 컴포넌트: `UserProfile.tsx` (PascalCase)
- 유틸리티: `format-date.ts` (kebab-case)
- 훅: `usePosts.ts` (camelCase + 'use')
- 타입: `User.ts` (PascalCase)
- 서버 액션: `actions.ts`, `mutations.ts`
- API 라우트: `route.ts`

### 컴포넌트 작성
```typescript
// ✅ 좋은 예시 (서버 컴포넌트)
export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true }
  })
  return <UserList users={users} />
}

// ✅ 좋은 예시 (클라이언트 컴포넌트)
'use client'
export function UserList({ users }: { users: User[] }) {
  const [filter, setFilter] = useState('')
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>{filteredUsers.map(user => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  )
}
```

### 에러 처리
```typescript
'use client'
import { Component, ReactNode } from 'react'
import { toast } from 'sonner'

// React Error Boundary
export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-900">오류가 발생했습니다</h2>
          <p className="text-red-700 mt-2">{this.state.error?.message}</p>
        </div>
      )
    }
    return this.props.children
  }
}

// try-catch 사용
async function fetchData(id: string) {
  try {
    const data = await trpc.posts.byId.query({ id })
    return { success: true, data }
  } catch (error) {
    toast.error('데이터 가져오기 실패')
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' }
  }
}
```

### Prisma
```typescript
// lib/prisma.ts - 싱글톤 패턴
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// 쿼리 최적화 (선택적 필드)
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true },
  where: { emailVerified: { not: null } }
})

// 관계 로드
const posts = await prisma.post.findMany({
  include: {
    author: { select: { id: true, name: true } },
    comments: true
  }
})

// 페이지네이션
const posts = await prisma.post.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' }
})

// 트랜잭션
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { name: 'John', email: 'john@example.com' } })
  await tx.post.create({ data: { title: 'First Post', authorId: user.id } })
  return user
})
```

---

## Git 커밋 메시지

```
feat(auth): 사용자 로그인 기능 구현
fix(api): 데이터 페칭 오류 수정
docs: README 업데이트
refactor: 컴포넌트 구조 개선
perf: 쿼리 성능 최적화
test: 로그인 테스트 추가
style: Tailwind 클래스 정리
chore: 의존성 업데이트
```

---

## 성능 최적화

### 체크리스트

#### 1. 서버 컴포넌트 우선
```typescript
// ✅ 좋음 (서버 컴포넌트)
export default async function Page() {
  const data = await prisma.post.findMany()
  return <PostList data={data} />
}

// ❌ 피함 (불필요한 클라이언트 컴포넌트)
'use client'
export default function Page() {
  const { data } = useQuery({ queryFn: fetchPosts })
}
```

#### 2. 페이지 캐싱 (Revalidate)
```typescript
export const revalidate = 3600 // 1시간마다 재검증

// on-demand revalidation
import { revalidatePath } from 'next/cache'
await revalidatePath('/posts')
await revalidateTag('posts')
```

#### 3. 스트리밍 및 Suspense
```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SlowComponent />
    </Suspense>
  )
}
```

#### 4. 이미지 최적화
```typescript
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="설명"
  width={200}
  height={200}
  loading="lazy"
  className="rounded-md"
/>
```

#### 5. 코드 분할
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <div>로딩 중...</div>,
  ssr: false
})
```

---

## 보안

### 체크리스트

#### 1. 환경 변수
```bash
# .env.local (Git 제외)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
AUTH_SECRET="your-secret-key-here"
```

#### 2. 입력 검증 (Zod)
```typescript
const userSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다')
})

function validateUserInput(input: unknown) {
  try {
    const validated = userSchema.parse(input)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(', ') }
    }
    return { success: false, error: '알 수 없는 검증 오류' }
  }
}
```

#### 3. API 라우트 보안
```typescript
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const posts = await prisma.post.findMany()
  return NextResponse.json(posts)
}
```

#### 4. XSS 방어
```typescript
// DOMPurify로 HTML sanitization (npm install dompurice @types/dompurify)
import DOMPurify from 'dompurify'

function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title', 'target']
  })
}
```

#### 5. SQL Injection 방어
```typescript
// ✅ 안전 (Prisma 자동 방어)
const users = await prisma.user.findMany({
  where: { email: userInput } // 자동으로 파라미터화됨
})

// ✅ 안전 (raw query)
const result = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${userInput}`

// ❌ 위험 (직접 SQL 조합 - 하지 말 것)
const unsafe = `SELECT * FROM User WHERE email = '${userInput}'`
```

---

## 개발 워크플로우 (MCP 활용)

### 새로운 기능 개발
```
AI에게 요청: "블로그 포스트 관리 기능을 만들어줘"

AI 자동화 프로세스 (2-3분):
1. prisma-local: Post 모델 생성, 마이그레이션
2. shadcn: card, table, dialog 추가
3. tailwindcss-server: 레이아웃, 색상 팔레트
4. 코드 생성: tRPC, TanStack Query, UI
5. next-devtools: 에러 확인
```

### 데이터베이스 변경
```
AI: "User 모델에 emailVerified 필드 추가"
프로세스: prisma-local → next-devtools (1분)
```

### UI 컴포넌트 개발
```
AI: "로그인 폼 만들어줘"
프로세스: shadcn → tailwindcss → better-auth (2분)
```

---

## 주의사항

### ignoreScripts
- `sharp`, `unrs-resolver` 스크립트 무시됨
- 이미지 관련 기능 시 확인 필요

### trustedDependencies
- `sharp`, `unrs-resolver` 신뢰된 패키지

### Next.js 16
- React 19 사용
- App Router 기본
- 서버 액션 지원

---

## 테스트 가이드

### ⚠️ 테스트 전 필수 참고
테스트 진행 시 반드시 [TEST_INFO.md](./docs/TEST_INFO.md) 문서를 확인해주세요.

### 주요 참고 사항
- **로그인 정보**: 테스트 계정 정보는 TEST_INFO.md에 기록
- **개발 서버**: 포트 3000에서 실행 중인 것으로 가정
- **서버 제약**: next dev 서버의 시작/종료 작업 금지

---

## 참고 리소스

사용되는 모든 라이브러리의 공식 사이트/문서:
- [Next.js](https://nextjs.org/docs), [tRPC](https://trpc.io/docs), [Prisma](https://www.prisma.io/docs), [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod](https://zod.dev), [TanStack Query](https://tanstack.com/query), [Radix UI](https://www.radix-ui.com), [Base UI](https://base-ui.com)
- [better-auth](https://www.better-auth.com), [Lucide](https://lucide.dev), [Sonner](https://sonner.emilkowal.ski)

---

**버전**: 3.0.0 | **마지막 업데이트**: 2026-03 | **package.json 기반**

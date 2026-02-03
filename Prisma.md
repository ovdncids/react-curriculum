# Prisma@7.3.0
* [Next.js + Prisma postgres cloud 설치 방법 (node@20.19.6, react@19.2.3, next@16.1.6, tailwindcss@4.1.18)](https://www.prisma.io/docs/guides/nextjs)

## Next.js + Prisma + MariaDB
```sh
# node@20.19.6, react@19.2.3, next@16.1.6, tailwindcss@4.1.18
npx create-next-app@latest nextjs-prisma

npm install prisma tsx --save-dev
npm install @prisma/client @prisma/adapter-mariadb dotenv
npx prisma init --output ../app/generated/prisma
# --db는 Prisma의 Postgres Cloud를 생성하는 옵션
```

### Docker@29.1.5에 MariaDB@10.6.24 생성
```sh
docker run -d ^
  --name mariadb ^
  -p 3306:3306 ^
  -e MARIADB_ROOT_PASSWORD=rootpassword ^
  -e MARIADB_DATABASE=testdb ^
  -e MARIADB_USER=testuser ^
  -e MARIADB_PASSWORD=testpass ^
  mariadb:10.6
```

prisma/schema.prisma
```diff
- provider = "postgresql"
+ provider = "mysql"
```

.env
* root 계정을 사용해야 테이블이 생성된다. testuser을 사용할 경우 `테이블이 생성 권한`을 줘야 한다.
```env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/testdb"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_USER="root"
DATABASE_PASSWORD="rootpassword"
DATABASE_NAME="testdb"
```

### Table 생성
prisma/schema.prisma
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
```
```sh
# MariaDB에 테이블 생성
npx prisma migrate dev --name init

# Prisma Client 생성 (app/generated/client.ts)
npx prisma generate
```

### Data 생성
* https://www.prisma.io/docs/orm/overview/databases/mysql#using-the-mariadb-driver

lib/prisma.ts
```ts
import "dotenv/config"
import {PrismaMariaDb} from "@prisma/adapter-mariadb"
import {PrismaClient} from "../app/generated/prisma/client"

const adapter = new PrismaMariaDb(
  {
    host: process.env.DATABASE_HOST ?? "localhost",
    port: Number(process.env.DATABASE_PORT ?? 3306),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
  }
)
export default new PrismaClient({adapter})
```

prisma/seed.ts
```ts
import {Prisma} from "../app/generated/prisma/client"
import prisma from "@/lib/prisma"

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube"
        }
      ]
    }
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true
        }
      ]
    }
  }
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({data: u})
  }
}

main()
```

prisma.config.ts
```ts
  migrations: {
    seed: "tsx prisma/seed.ts"
  }
```

```sh
# Data 생성 (Running seed command `tsx prisma/seed.ts` ... 여기서 멈출 수 있음)
npx prisma db seed

# 
```

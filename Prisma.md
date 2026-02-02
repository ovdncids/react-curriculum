# Prisma@7.3.0
* [Next.js + Prisma postgres cloud 설치 방법 (node@20.19.6, react@19.2.3, next@16.1.6, tailwindcss@4.1.18)](https://www.prisma.io/docs/guides/nextjs)

## Next.js + Prisma + MariaDB
```sh
npx create-next-app@latest nextjs-prisma

npm install prisma tsx --save-dev
npm install @prisma/client @prisma/adapter-mariadb dotenv
npx prisma init --output ../app/generated/prisma
```

### Docker에 MariaDB 생성
```sh
docker run -d ^
  --name mariadb ^
  -p 3306:3306 ^
  -e MARIADB_ROOT_PASSWORD=rootpassword ^
  -e MARIADB_DATABASE=testdb ^
  -e MARIADB_USER=testuser ^
  -e MARIADB_PASSWORD=testpass ^
  mariadb:latest
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
```

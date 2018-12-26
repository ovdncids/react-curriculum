# MSSQL-Paging

## MS-SQL 2000
```sql
SELECT IDENTITY(INT, 1, 1) AS ROWNUM, A.*
INTO #Temp
FROM (추출결과) A
SELECT * FROm #Temp
```

## MS-SQL 2005
```sql
SELECT * FROM (
  SELECT *
    , ROW_NUMBER() OVER (ORDER BY idx_num ASC) AS ROW_NUM            /* 몇 페이지의 몇 개의 레코드를 부를때 사용 */
    , ROW_NUMBER() OVER (ORDER BY idx_num DESC) AS ROW_NUM_REVERSE   /* 리스트에서 번호로 사용 */
    , COUNT(*) OVER() AS PG_CNT_
  FROM member_table
) A
WHERE ROW_NUM BETWEEN 1 AND 5 ORDER BY idx_num DESC
```

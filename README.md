# Awesome-Place-Spring
##  맛집 추천 웹 서비스(Recommending restaurant web service) : BackEnd (Spring)

#### Description
  > 22.10.10 ~ 22.11.2 
  
#### 👨‍💻 Member
  > 정의정
  
### 개요
  > 서울열린데이터광장에서 제공하는 공공데이터를 가공, 활용하여 소비자가 선택한 음식점에 대한 정보를 보다 쉽게 제공받을 수 있는 서비스
  > 
  > 기존에 개발했던 AwesomePlace 서비스 백엔드 파트를 수정&보완하여 재개발함

### DNS
  - [백엔드 서버]()

### 프로젝트 내용
  * 서버 및 DB
    * Javascript기반 Node.js 프레임워크 활용
    * AWS EC2를 이용하여 서버 환경 구축
    * AWS RDS를 이용하여 mysql 구축
    * AWS S3 버킷에 음식점 이미지 저장
    * DB에 선정한 약 300개 음식점 이미지 url 및 옵션 삽입
    * Connection Pool로 DB 접근
  * 기능
    * 회원가입 페이지: 회원가입(hash 암호화) 기능
    * 로그인 페이지: 로그인(JWT) 기능
    * 마이 페이지: 회원 정보 수정, 찜 목록 리스트 조회 및 취소 기능
    * 메인 페이지: 검색, 룰렛, 선택장애, 카테고리 기능
    * 테마 별 추천 페이지: 테마 리스트 조회 기능
    * 검색결과 페이지: 검색결과 조회 기능
    * 맛집 상세 페이지: 맛집 정보, 댓글 추가, 찜 설정 및 취소 기능
  * 기존 AwesomePlace 프로젝트에서 수정 & 보완된 점
    * DB에 음식점 데이터가 없는 경우 데이터를 추가하는 코드 추가
    * connection pool을 생성하고 sql 쿼리문을 직접 다뤄보기 위해 ORM(Sequelize)을 사용하지 않음
    * api 요청 부분 method 및 url, request, response 양식 수정함 (자세한 내용은 아래 api 설계 참고)
    * controller를 model 접근과 용도를 고려하여 세분화함
    * 중복되는 코드 최소화 & 변수명 일관성 유지

### 일정
  미정
  
### 요구사항
  미정
  
### 아키텍처
  미정
  
### 설계
#### 1. ERD
  미정
  
#### 2. Class Diagram
  미정
  
#### 3. Sequence Diagram
  미정

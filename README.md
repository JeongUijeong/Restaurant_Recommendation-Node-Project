# Awesome-Place-Spring
##  맛집 추천 웹 서비스(Restaurant_Recommendation-Node-Project) : BackEnd

#### Description
  > 22.10.10 ~ 22.11.2 
  
#### 👨‍💻 Member
  > 정의정
  
### 개요
  > 서울열린데이터광장에서 제공하는 공공데이터를 가공, 활용하여 소비자가 선택한 음식점에 대한 정보를 보다 쉽게 제공받을 수 있는 서비스
  > 
  > 기존에 개발했던 AwesomePlace 서비스 백엔드 파트를 수정&보완하여 재개발함

### DNS
  - [백엔드 서버 (메인페이지 요청)](http://ec2-54-210-101-118.compute-1.amazonaws.com:80/main)

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
    * api 요청 부분 method 및 url, request, response 양식 수정함
    * controller를 model 접근과 용도를 고려하여 세분화함
    * 중복되는 코드 최소화 & 변수명 일관성 유지

### 일정
  <img src="https://user-images.githubusercontent.com/94631526/199167383-6cfde4ed-e16c-4a17-bbfe-3af93193142b.png" width=650 height=630>
  
### 요구사항
  <img src="https://user-images.githubusercontent.com/94631526/199172064-f86f37dc-1166-42d2-aa01-b0ec7701e7e6.png" width=650 height=380>
  
### 아키텍처
  미정
  
### 설계
#### 1. ERD
  <img src="https://user-images.githubusercontent.com/94631526/199168464-2abe1e69-cc26-4184-b6d8-8cc5e265f35b.png" width=650 height=600>
  
#### 2. Class Diagram
  <img src="https://user-images.githubusercontent.com/94631526/199168478-d3d14bf3-996e-4eef-a197-58ab23e040ae.png" width=650 height=450>
  <img src="https://user-images.githubusercontent.com/94631526/199168471-d6b7a30c-0f3a-42d5-a7f9-695ec0eb923c.png" width=650 height=500>
  <img src="https://user-images.githubusercontent.com/94631526/199168479-af6c2347-bc57-439f-8e2b-e65b3b36aa59.png" width=650 height=480>
  <img src="https://user-images.githubusercontent.com/94631526/199168467-37685e1c-bdf5-4a96-b962-d143440fee4a.png" width=650 height=300>
  <img src="https://user-images.githubusercontent.com/94631526/199168472-0527cdbf-b887-4482-849d-d8f2ef1e6b23.png" width=650 height=350>
  <img src="https://user-images.githubusercontent.com/94631526/199168470-be9b2a56-0636-42d8-a14a-e475b34cfb5c.png" width=650 height=480>
  <img src="https://user-images.githubusercontent.com/94631526/199168476-eb1d7c46-d728-4708-91f8-194d5004f4bb.png" width=650 height=450>
  
#### 3. Sequence Diagram
  <img src="https://user-images.githubusercontent.com/94631526/199169361-3d07b279-76e8-4924-8fe7-6cf0ad2cf47c.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169364-f2f04a73-675b-49ec-9133-5f7e4840bad1.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169367-15595ef6-10a1-4fc7-90e4-318425a1d3de.png" width=650 height=420>
  <img src="https://user-images.githubusercontent.com/94631526/199169369-c09b5537-038f-4927-bbfa-6959cf7577e8.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169362-0a90f1d9-1852-4625-83b3-0cacc3a9f5ab.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169370-96390089-2a1d-4acb-a271-639fd899b04b.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169359-f24fb2d7-a548-49d6-8c8d-a8749a59a1b6.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169373-a71ecbd5-f5ac-45cf-9fab-2ab793cd9a91.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169376-403e73cb-ce9f-4a84-9581-01fca2ef9213.png" width=650 height=360>
  <img src="https://user-images.githubusercontent.com/94631526/199169355-d6fb60b7-0230-40e1-94aa-0a39f73c88b8.png" width=650 height=360>

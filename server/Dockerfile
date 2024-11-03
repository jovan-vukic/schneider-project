FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /app

COPY . /app/

RUN mvn clean package

FROM openjdk:21

WORKDIR /app

COPY .env /app/.env

COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

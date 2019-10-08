spring-boot-parent
=============

Parent which allows the usage of Spring Boot in combination with the [pro-vision global-parent](https://github.com/pro-vision/pv-build-tools/tree/develop/maven/global-parent).

Defines fixed versions of Spring Boot dependencies based on the following naming schema:

`<version>-<spring-boot-version>` e.g. `1-2.1.8` is the first release for Spring Boot 2.1.8. 

## Docker

The spring-boot-parent parent provides a ready to use configuration if you want to build Docker images from your Spring Boot Project.

First you need to configure the `docker.image.repository` and `docker.image.prefix` properties in your `pom.xml`:
```
<properties>
  <!-- docker settings -->
  <docker.image.repository>YOUR-DOCKER-REGISTRY</docker.image.repository>
  <docker.image.prefix>pro-vision</docker.image.prefix>
</properties>
```
Then add the following build plugins:
```
 <build>
    <plugins>
      <plugin>
        <groupId>com.spotify</groupId>
        <artifactId>dockerfile-maven-plugin</artifactId>
        <configuration>
          <skip>false</skip>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-dependency-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
```

Afterwards you can provide a Dockerfile which needs to reference your Application's Main Class:
```
FROM adoptopenjdk/openjdk11-openj9:alpine-jre
VOLUME /tmp
ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","org.springframework.samples.petclinic.PetClinicApplication"]
```

When you now run `mvn clean install dockerfile:build` you'll get the required image.

For further information see:
* [spotify:dockerfile-maven](https://github.com/spotify/dockerfile-maven)
* [dev-eth0.de: Dockerize Spring Boot Applications](https://www.dev-eth0.de/2019/07/29/dockerize-spring-boot-applications/)

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/de.pro-vision.maven/de.pro-vision.maven.spring.spring-boot-parent/badge.svg)](https://maven-badges.herokuapp.com/maven-central/de.pro-vision.maven/de.pro-vision.maven.spring.spring-boot-parent)


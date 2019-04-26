package spring.boot.Front;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
public class FrontApplication {
   public static void main(String[] args) {
		SpringApplication.run(FrontApplication.class, args);
	}
}


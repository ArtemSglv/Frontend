package spring.boot.Front;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@EnableOAuth2Sso
@Configuration
public class FrontApplication extends WebSecurityConfigurerAdapter {
   public static void main(String[] args) {
		SpringApplication.run(FrontApplication.class, args);
	}

  @Override
  public void configure(HttpSecurity http) throws Exception {
    http
      .logout().logoutSuccessUrl("/").and()
      .authorizeRequests()
        .antMatchers("/index.html", "/", "/signin").permitAll()
        .antMatchers("/app/events/1").authenticated()
        .anyRequest().permitAll()
      .and()
        .csrf()
        .disable();
//      .formLogin().loginPage("/login1.html").failureUrl("/fmafss").permitAll();
  }
}


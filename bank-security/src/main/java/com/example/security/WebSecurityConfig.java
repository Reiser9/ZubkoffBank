package com.example.security;

import com.example.handler.UserBlockedHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.example.service.impl.UserDetailsServiceImpl;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@SuppressWarnings("deprecation")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private JwtRequestFilter jwtRequestFilter;
	@Autowired
	private UserBlockedHandler userBlockedHandler;
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "OPTIONS", "DELETE", "PATCH"));
		configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization", "Content-Length", "X-Requested-With"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());

    }
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors().and()
			.csrf().disable()
			.authorizeRequests()
			.antMatchers("/websocket/**",
					"/static/**", "/templates/**", "/auth/**", "/api/**",
					"/h2-console/**", "/health/**", "/card/types/**", "/test-kafka/**", "/subscribes/**").anonymous()
			.antMatchers("/user/**").access("hasAnyAuthority('user') and !hasAnyAuthority('blocked')")
			.antMatchers("/admin/**").access("hasAnyAuthority('admin') and !hasAnyAuthority('blocked')")
			.antMatchers("/admin/user/**").access("hasAnyAuthority('admin') and !hasAnyAuthority('blocked')")
			.antMatchers("/admin/users/**").access("hasAnyAuthority('admin') and !hasAnyAuthority('blocked')")
			.anyRequest().access("authenticated and !hasAuthority('blocked')")
			.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and().exceptionHandling().accessDeniedHandler(userBlockedHandler);

		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
		http.headers().frameOptions().disable();
		http.cors().and().csrf().disable();
	}

}

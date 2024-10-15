package com.album.react.common.config;


import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:/config.properties")
public class DBConfig {
	
	@Autowired
	private ApplicationContext applicationContext;
	
	@Bean
	@ConfigurationProperties(prefix="spring.datasource.hikari")
	public HikariConfig hikariConfig() {
		
		return new HikariConfig();
		
	}
	
	@Bean
	public DataSource dataSource(HikariConfig config) {
		
		DataSource dataSource = new HikariDataSource(config);
		return dataSource;
	}
	
	// 위에 까지는 hikariCP 위한 설정
	
	// Mybatis 설정
	@Bean
	public SqlSessionFactory sessionFactory(DataSource dataSource) throws Exception {
		
		SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();

		sessionFactoryBean.setDataSource(dataSource);

		sessionFactoryBean.setMapperLocations(
				applicationContext.getResources("classpath:/mappers/**.xml") );
		
		sessionFactoryBean.setTypeAliasesPackage("com.album.react");
		
		// 마이바티스 설정 파일 경로 지정 (mybatis-config.xml)
		sessionFactoryBean.setConfigLocation(
					applicationContext.getResource("classpath:/mybatis-config.xml")
				);
		
		// 설정 내용이 모두 적용된 객체 반환
		return sessionFactoryBean.getObject();
	}
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sessionFactory) {
		return new SqlSessionTemplate(sessionFactory);
	}

	// DataSourceTransactionManager : 트랜잭션 매니저(제어 처리)
	@Bean
	public DataSourceTransactionManager dataSourceTransactionManager(DataSource dataSource) {
		return new DataSourceTransactionManager(dataSource);
	}

}

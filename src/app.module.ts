import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MotoristasModule } from './modules/motoristas/motoristas.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'host_default'),
        port: Number(configService.get('DB_PORT', 3306)),
        username: configService.get('DB_USERNAME', 'user_default'),
        password: configService.get('DB_PASSWORD', 'root'),
        database: configService.get('DB_DATABASE', 'local'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
      })
    }),
    MotoristasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

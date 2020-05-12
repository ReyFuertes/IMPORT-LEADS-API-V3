// import { Injectable } from '@nestjs/common';
// import { CredentialBody } from 'google-auth-library';

// @Injectable()
// export class ConfigService {
//     private getEnv(name: string): string {
//         const env = process.env[name];
//         if (env) {
//             return env;
//         }
//         throw new Error(`"${name}" is not defined`);
//     }
//     // get gcloudProjectId(): string {
//     //     return this.getEnv('GCLOUD_PROJECT_ID');
//     // }
//     // get gcloudAppCredentials(): CredentialBody {
//     //     return JSON.parse(this.getEnv('GCLOUD_APP_CREDENTIALS'));
//     // }
//     // get gcloudBucketName(): string {
//     //     return this.getEnv('GCLOUD_BUCKET_NAME');
//     // }
// }
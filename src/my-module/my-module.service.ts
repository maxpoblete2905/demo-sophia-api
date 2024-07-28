import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyModuleService {
  private firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {
    const serviceAccountPath = this.configService.get<string>(
      'GOOGLE_APPLICATION_CREDENTIALS',
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });

    this.firestore = admin.firestore();
  }

  async getDocument(): Promise<any> {
    try {
      const documentRef = this.firestore.collection('options-data').doc('max');
      const documentSnapshot = await documentRef.get();

      if (documentSnapshot.exists) {
        console.log(documentSnapshot.id, '=>', documentSnapshot.data());
        return documentSnapshot.data();
      } else {
        console.log(`Document with ID  not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      throw new Error('Could not retrieve document.');
    }
  }
}

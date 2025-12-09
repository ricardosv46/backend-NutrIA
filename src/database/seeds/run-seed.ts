import AppDataSource from '../data-source';
import { seedMeals } from './meals.seed';

async function runSeed() {
  try {
    console.log('🌱 Starting seed process...');
    
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database connection initialized');
    }

    await seedMeals(AppDataSource);
    
    console.log('✅ Seed process completed successfully!');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error during seed process:', error);
    process.exit(1);
  }
}

runSeed();


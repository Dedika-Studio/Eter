import dotenv from 'dotenv';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Load environment variables from .env.sheets
dotenv.config({ path: '.env.sheets' });

async function testConnection() {
  const credsJson = process.env.GOOGLE_SHEETS_CREDS;
  const spreadsheetId = process.env.SPREADSHEET_ID;

  if (!credsJson || !spreadsheetId) {
    console.error('❌ Missing GOOGLE_SHEETS_CREDS or SPREADSHEET_ID');
    process.exit(1);
  }

  try {
    console.log('🔗 Connecting to Google Sheets...');
    const creds = JSON.parse(credsJson);
    const auth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, auth);
    await doc.loadInfo();

    console.log('✅ Connected successfully!');
    console.log(`📊 Spreadsheet: ${doc.title}`);
    console.log(`📝 Current sheets: ${Object.keys(doc.sheetsByTitle).join(', ')}`);

    // Create required sheets
    const requiredSheets = ['users', 'tickets', 'orders', 'raffles', 'purchases', 'products', 'news'];
    const headers: Record<string, string[]> = {
      users: ['id', 'openId', 'name', 'email', 'loginMethod', 'role', 'createdAt', 'updatedAt', 'lastSignedIn'],
      tickets: ['id', 'number', 'status', 'buyerName', 'buyerPhone', 'buyerEmail', 'userId', 'orderId', 'reservedAt', 'soldAt', 'createdAt', 'updatedAt'],
      orders: ['id', 'userId', 'buyerName', 'buyerPhone', 'buyerEmail', 'ticketNumbers', 'ticketCount', 'totalAmount', 'status', 'stripeSessionId', 'stripePaymentIntentId', 'syncedToSheets', 'createdAt', 'updatedAt'],
      raffles: ['id', 'title', 'description', 'image', 'totalTickets', 'pricePerTicket', 'drawDate', 'webhookUrl', 'category', 'raffleNumber', 'isActive', 'createdAt', 'updatedAt'],
      purchases: ['id', 'userId', 'raffleId', 'productId', 'type', 'amount', 'currency', 'ticketNumbers', 'quantity', 'stripePaymentIntentId', 'stripeCheckoutSessionId', 'status', 'buyerName', 'buyerEmail', 'buyerPhone', 'createdAt', 'updatedAt'],
      products: ['id', 'title', 'description', 'price', 'image', 'link', 'rating', 'reviews', 'badge', 'createdAt', 'updatedAt'],
      news: ['id', 'title', 'content', 'summary', 'image', 'source', 'sourceUrl', 'slug', 'isPublished', 'createdAt', 'updatedAt'],
    };

    for (const sheetName of requiredSheets) {
      const existing = doc.sheetsByTitle[sheetName];
      if (!existing) {
        console.log(`📌 Creating sheet: ${sheetName}`);
        await doc.addSheet({ title: sheetName, headerValues: headers[sheetName] });
      } else {
        console.log(`✓ Sheet already exists: ${sheetName}`);
      }
    }

    console.log('\n✅ All sheets are ready!');
    console.log('🎉 Google Sheets integration is working correctly!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testConnection();

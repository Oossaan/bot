import { query } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phone, message, serviceType } = await request.json()

    // Save to database
    const result = await query(
      'INSERT INTO orders (phone, message, service_type) VALUES ($1, $2, $3) RETURNING *',
      [phone, message, serviceType]
    )

    console.log('Database result:', result.rows[0])

    // Send WhatsApp message
    const whatsappResponse = await fetch('https://api.whatsapp.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`
      },
      body: JSON.stringify({
        to: phone,
        body: message
      })
    });

    if (!whatsappResponse.ok) {
      await query(
        'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
        ['failed', result.rows[0].id]
      );
      throw new Error('WhatsApp API request failed');
    }

    const whatsappData = await whatsappResponse.json();
    
    // Update order status
    const updateResult = await query(
      'UPDATE orders SET status = $1, whatsapp_id = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      ['sent', whatsappData.id, result.rows[0].id]
    );

    return NextResponse.json({ 
      success: true,
      order: updateResult.rows[0],
      whatsapp_id: whatsappData.id
    })
  } catch (error) {
    console.error('WhatsApp API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

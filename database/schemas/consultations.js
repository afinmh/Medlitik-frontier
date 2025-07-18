/**
 * Consultations Table Schema
 * Skema untuk tabel konsultasi antara pasien dan dokter
 */

const consultationsSchema = {
  tableName: 'consultations',
  columns: {
    id: {
      type: 'BIGINT',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    patient_id: {
      type: 'BIGINT',
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    doctor_id: {
      type: 'BIGINT',
      allowNull: false,
      references: {
        model: 'doctors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    consultation_type: {
      type: 'ENUM',
      values: ['chat', 'voice', 'video'],
      allowNull: false,
      defaultValue: 'chat'
    },
    status: {
      type: 'ENUM',
      values: ['pending', 'active', 'completed', 'cancelled', 'refunded'],
      allowNull: false,
      defaultValue: 'pending'
    },
    chief_complaint: {
      type: 'TEXT',
      allowNull: false
    },
    symptoms: {
      type: 'JSON',
      allowNull: true
    },
    medical_history: {
      type: 'TEXT',
      allowNull: true
    },
    diagnosis: {
      type: 'TEXT',
      allowNull: true
    },
    treatment_plan: {
      type: 'TEXT',
      allowNull: true
    },
    prescription: {
      type: 'JSON',
      allowNull: true
    },
    follow_up_required: {
      type: 'BOOLEAN',
      defaultValue: false,
      allowNull: false
    },
    follow_up_date: {
      type: 'DATETIME',
      allowNull: true
    },
    fee_amount: {
      type: 'DECIMAL(10,2)',
      allowNull: false
    },
    payment_status: {
      type: 'ENUM',
      values: ['pending', 'paid', 'failed', 'refunded'],
      allowNull: false,
      defaultValue: 'pending'
    },
    payment_method: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    scheduled_at: {
      type: 'DATETIME',
      allowNull: true
    },
    started_at: {
      type: 'DATETIME',
      allowNull: true
    },
    ended_at: {
      type: 'DATETIME',
      allowNull: true
    },
    created_at: {
      type: 'DATETIME',
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updated_at: {
      type: 'DATETIME',
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    }
  },
  indexes: [
    {
      name: 'consultations_patient_id_index',
      fields: ['patient_id']
    },
    {
      name: 'consultations_doctor_id_index',
      fields: ['doctor_id']
    },
    {
      name: 'consultations_status_index',
      fields: ['status']
    },
    {
      name: 'consultations_scheduled_at_index',
      fields: ['scheduled_at']
    },
    {
      name: 'consultations_payment_status_index',
      fields: ['payment_status']
    }
  ]
};

module.exports = consultationsSchema;

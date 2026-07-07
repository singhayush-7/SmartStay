import Payment from "../models/payment.model.js";

const generateInvoiceNumber = async () => {
  
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  const datePart = `${year}${month}${day}`;

  
  const startOfDay = new Date(year, today.getMonth(), today.getDate());

  const endOfDay = new Date(year, today.getMonth(), today.getDate() + 1);

  const invoiceCount = await Payment.countDocuments({
    createdAt: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  const sequence = String(invoiceCount + 1).padStart(4, "0");

  return `INV-${datePart}-${sequence}`;
};

export default generateInvoiceNumber;
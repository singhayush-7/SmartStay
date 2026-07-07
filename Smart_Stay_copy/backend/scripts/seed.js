import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";


import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import Room from "../models/room.model.js";
import Booking from "../models/booking.model.js";
import Payment from "../models/payment.model.js";
import Complaint from "../models/complaint.model.js";
import Maintenance from "../models/maintenance.model.js";
import readline from "readline";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Maintenance.deleteMany();
    await Complaint.deleteMany();
    await Payment.deleteMany();
    await Booking.deleteMany();
    await Room.deleteMany();
    await Property.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
};

const seedData = async (clearExisting = true) => {
  try {
    if (clearExisting) {
      
      await destroyData();
    }

    console.log("Seeding started...");
 
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "admin@smartstay.com",
      password: hashedPassword,
      phone: "9999999999",
      role: "admin",
      isVerified: true,
      avatar: {
        public_id: "admin_avatar",
        secure_url: faker.image.avatar(),
      },
    });

    const owners = [];
    for (let i = 0; i < 3; i++) {
      owners.push({
        name: faker.person.fullName(),
        email: `owner${i + 1}@example.com`,
        password: hashedPassword,
        phone: faker.phone.number({ style: 'international' }),
        role: "owner",
        isVerified: true,
        avatar: { public_id: `demo_${faker.string.uuid()}`, secure_url: faker.image.avatar() },
      });
    }
    const createdOwners = await User.insertMany(owners);

    const tenants = [];
    const tenantCount = faker.number.int({ min: 15, max: 20 });
    for (let i = 0; i < tenantCount; i++) {
      tenants.push({
        name: faker.person.fullName(),
        email: `tenant${i + 1}@example.com`,
        password: hashedPassword,
        phone: faker.phone.number({ style: 'international' }),
        role: "tenant",
        isVerified: true,
        avatar: { public_id: `demo_${faker.string.uuid()}`, secure_url: faker.image.avatar() },
      });
    }
    const createdTenants = await User.insertMany(tenants);

    console.log(`Created 1 Admin, ${createdOwners.length} Owners, and ${createdTenants.length} Tenants.`);

    
    const propertyData = [];
    const propertyCount = faker.number.int({ min: 6, max: 8 });
    const propertyNames = ["Green Residency", "Sky PG", "City Hostel", "Urban Nest", "Blue Heights", "Sunrise Dorms", "Elite Living", "Royal Hostels"];
    const propertyImages = [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb",
      "https://images.unsplash.com/photo-1596276020587-ae5366414bb4",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1de2424009"
    ];

    for (let i = 0; i < propertyCount; i++) {
      propertyData.push({
        name: propertyNames[i] || faker.company.name() + " Hostel",
        description: faker.lorem.paragraph(),
        owner: faker.helpers.arrayElement(createdOwners)._id,
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('######'),
        pincode: faker.location.zipCode('######'),
        location: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        gender: faker.helpers.arrayElement(["male", "female", "co-ed"]),
        category: faker.helpers.arrayElement(["Hostel", "PG", "Apartment"]),
        amenities: faker.helpers.arrayElements(
          ["WiFi", "AC", "Laundry", "Meals", "Power Backup", "CCTV", "Gym", "Parking"],
          { min: 3, max: 6 }
        ),
        foodAvailable: faker.datatype.boolean(),
        wifiAvailable: true,
        parkingAvailable: faker.datatype.boolean(),
        images: [
          { public_id: `demo_${faker.string.uuid()}`, secure_url: faker.helpers.arrayElement(propertyImages) },
          { public_id: `demo_${faker.string.uuid()}`, secure_url: faker.helpers.arrayElement(propertyImages) },
        ],
        totalRooms: 0,
        totalBeds: 0,
        occupiedBeds: 0,
        availableBeds: 0,
        averageRating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
        totalReviews: faker.number.int({ min: 10, max: 100 }),
        isActive: true,
      });
    }

    const properties = await Property.insertMany(propertyData);
    console.log(`Created ${properties.length} Properties.`);

    
    const roomData = [];
    
    const totalRoomsToCreate = faker.number.int({ min: 50, max: 100 });
    const roomsPerProperty = Math.ceil(totalRoomsToCreate / properties.length);
    
    for (const property of properties) {
      const numRooms = roomsPerProperty;
      
      let propTotalBeds = 0;
      
      for (let i = 0; i < numRooms; i++) {
        const roomType = faker.helpers.arrayElement(["single", "double", "triple", "four-sharing"]);
        const capacityMap = { "single": 1, "double": 2, "triple": 3, "four-sharing": 4 };
        const capacity = capacityMap[roomType];
        
        propTotalBeds += capacity;

        roomData.push({
          property: property._id,
          roomNumber: `${100 + i}`,
          roomType,
          capacity,
          occupiedBeds: 0,
          availableBeds: capacity,
          rent: faker.number.int({ min: 5000, max: 20000 }),
          securityDeposit: faker.number.int({ min: 5000, max: 20000 }),
          floor: faker.number.int({ min: 0, max: 5 }),
          hasAC: faker.datatype.boolean(),
          attachedBathroom: faker.datatype.boolean(),
          furnished: true,
          wifiAvailable: true,
          images: [
            { public_id: `demo_${faker.string.uuid()}`, secure_url: faker.helpers.arrayElement(propertyImages) }
          ],
          status: "available",
          isActive: true,
        });
      }
      
      property.totalRooms = numRooms;
      property.totalBeds = propTotalBeds;
      property.availableBeds = propTotalBeds;
      await property.save();
    }

    const rooms = await Room.insertMany(roomData);
    console.log(`Created ${rooms.length} Rooms.`);

    
    const bookingData = [];
    for (const tenant of createdTenants) {
      
      const numBookings = faker.number.int({ min: 1, max: 2 });
      for (let i = 0; i < numBookings; i++) {
        const property = faker.helpers.arrayElement(properties);
        const propertyRooms = rooms.filter(r => r.property.toString() === property._id.toString());
        if (propertyRooms.length === 0) continue;
        
        const room = faker.helpers.arrayElement(propertyRooms);
        const status = faker.helpers.arrayElement(["pending", "approved", "rejected", "cancelled", "completed"]);

        bookingData.push({
          tenant: tenant._id,
          property: property._id,
          room: room._id,
          owner: property.owner,
          status,
          checkInDate: faker.date.recent({ days: 30 }),
          checkOutDate: faker.date.future({ years: 1 }),
          monthlyRent: room.rent,
          securityDeposit: room.securityDeposit,
          message: faker.lorem.sentence(),
          paymentStatus: status === "approved" || status === "completed" ? "paid" : "pending",
        });
        
        if ((status === "approved" || status === "completed") && room.availableBeds > 0) {
          room.occupiedBeds += 1;
          room.availableBeds -= 1;
          if (room.availableBeds === 0) room.status = "full";
        }
      }
    }

    const bookings = await Booking.insertMany(bookingData);
    console.log(`Created ${bookings.length} Bookings.`);

    for (const room of rooms) {
      await Room.updateOne({ _id: room._id }, { occupiedBeds: room.occupiedBeds, availableBeds: room.availableBeds, status: room.status });
    }

    
    const paymentData = [];
    for (const booking of bookings) {
      if (booking.status === "approved" || booking.status === "completed") {
        paymentData.push({
          booking: booking._id,
          tenant: booking.tenant,
          owner: booking.owner,
          property: booking.property,
          room: booking.room,
          amount: booking.monthlyRent,
          securityDeposit: booking.securityDeposit,
          rentMonth: faker.date.month(),
          dueDate: faker.date.recent(),
          status: "paid",
          paymentMethod: faker.helpers.arrayElement(["cash", "upi", "card", "netbanking"]),
          transactionId: faker.string.uuid(),
          invoiceNumber: `INV-${faker.number.int({ min: 100000, max: 999999 })}`,
          paidAt: faker.date.recent(),
          notes: "Initial booking payment",
        });
      }
    }

    const payments = await Payment.insertMany(paymentData);
    console.log(`Created ${payments.length} Payments.`);

    
    const complaintData = [];
    const complaintCategories = ["electricity", "water", "wifi", "cleaning", "food", "maintenance", "security", "other"];
    const priorities = ["low", "medium", "high", "urgent"];
    const statuses = ["pending", "in-progress", "resolved", "closed"];

    for (let i = 0; i < 50; i++) {
      const tenant = faker.helpers.arrayElement(createdTenants);
      const tenantBookings = bookings.filter(b => b.tenant.toString() === tenant._id.toString());
      if (tenantBookings.length === 0) continue;
      
      const booking = faker.helpers.arrayElement(tenantBookings);
      const status = faker.helpers.arrayElement(statuses);

      complaintData.push({
        tenant: tenant._id,
        owner: booking.owner,
        property: booking.property,
        room: booking.room,
        category: faker.helpers.arrayElement(complaintCategories),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        status,
        priority: faker.helpers.arrayElement(priorities),
        resolution: status === "resolved" || status === "closed" ? "Fixed the issue" : "",
        resolvedAt: status === "resolved" || status === "closed" ? faker.date.recent() : null,
      });
    }

    const complaints = await Complaint.insertMany(complaintData);
    console.log(`Created ${complaints.length} Complaints.`);

    
    const maintenanceData = [];
    for (let i = 0; i < 30; i++) {
      const owner = faker.helpers.arrayElement(createdOwners);
      const ownerProps = properties.filter(p => p.owner.toString() === owner._id.toString());
      if (ownerProps.length === 0) continue;
      
      const property = faker.helpers.arrayElement(ownerProps);
      const status = faker.helpers.arrayElement(["pending", "assigned", "in-progress", "completed", "cancelled"]);

      maintenanceData.push({
        property: property._id,
        owner: owner._id,
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        category: faker.helpers.arrayElement(["electrical", "plumbing", "cleaning", "painting", "internet", "furniture", "security", "other"]),
        priority: faker.helpers.arrayElement(["low", "medium", "high", "urgent"]),
        status,
        assignedTo: status !== "pending" ? faker.person.fullName() : "",
        expectedCompletionDate: faker.date.future(),
        completedAt: status === "completed" ? faker.date.recent() : null,
        estimatedCost: faker.number.int({ min: 500, max: 5000 }),
        actualCost: status === "completed" ? faker.number.int({ min: 500, max: 5000 }) : 0,
        completionNotes: status === "completed" ? "All done" : "",
      });
    }

    const maintenance = await Maintenance.insertMany(maintenanceData);
    console.log(`Created ${maintenance.length} Maintenance Records.`);

    console.log("Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  connectDB().then(() => destroyData().then(() => process.exit(0)));
} else {
  connectDB().then(async () => {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(
        "Data already exists. Do you want to (C)lear database or (A)ppend data? [C/A]: ",
        (answer) => {
          rl.close();
          const choice = answer.trim().toUpperCase();
          if (choice === "C") {
            console.log("Clearing existing data...");
            seedData(true);
          } else if (choice === "A") {
            console.log("Appending data...");
            seedData(false);
          } else {
            console.log("Invalid choice. Exiting...");
            process.exit(1);
          }
        }
      );
    } else {
      seedData(true);
    }
  });
}

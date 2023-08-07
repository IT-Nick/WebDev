import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
    if (req.method === 'GET') {
      const features = await prisma.feature.findMany();
      res.status(200).json(features);
    } else if (req.method === 'POST') {
      const { title, description } = req.body;
      const newFeature = await prisma.feature.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json(newFeature);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
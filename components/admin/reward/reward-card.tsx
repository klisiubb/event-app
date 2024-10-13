"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteDialog from "../delete-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { Edit, ImageIcon, TrophyIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Reward } from "@prisma/client";
import { DeleteReward } from "@/actions/admin/reward/delete";

export default function RewardCard({ reward }: { reward: Reward }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-primary line-clamp-2 flex-grow pr-2">
            {reward.name}
          </CardTitle>
          <Badge variant={reward.isPublished ? "default" : "destructive"}>
            {reward.isPublished ? "Published" : "Not Published"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 pb-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          {reward.imageUrl ? (
            <Image
              src={reward.imageUrl}
              alt={reward.name}
              className="transition-transform duration-300 hover:scale-105 object-cover"
              fill
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
              <span className="sr-only">Image not yet set</span>
            </div>
          )}
        </div>

        <div className="min-h-[4.5rem]">
          <p className="text-sm text-muted-foreground line-clamp-3 max-w-[300px] text-center">
            {reward.description || "Description not yet set"}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {`Quantity: ${reward.quantity}` || "Quantity not yet set"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button asChild variant="outline" className="flex-1">
          <Link
            href={`/admin/reward/edit/${reward.id}`}
            className="flex items-center justify-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Link>
        </Button>
        <DeleteDialog
          route="reward"
          id={reward.id}
          buttonText="Delete"
          text="this reward"
          deleteAction={DeleteReward}
        />
      </CardFooter>
    </Card>
  );
}

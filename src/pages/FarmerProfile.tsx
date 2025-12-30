"use client";

import { ArrowRight, Grid3x3, List } from "lucide-react";
import { FarmerHeader } from "@/components/FarmerHeader";
import { LotCard } from "@/components/LotCard";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { FarmerProfileSkeleton } from "@/components/skeletons/FarmerProfileSkeleton";
import { useFarmerById } from "@/hooks/useFarmers";
import { useLotsByFarmer } from "@/hooks/useLots";
import { useRouter } from "next/navigation";

export default function FarmerProfile({ id }: any) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<"lots" | "about">("lots");

  const { data: farmer, isLoading: isFarmerLoading } = useFarmerById(id);
  const { data: lots = [], isLoading: isLotsLoading } = useLotsByFarmer(id);

  const isLoading = isFarmerLoading || isLotsLoading;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "لغو دنبال کردن" : "دنبال کردن",
      description: isFollowing
        ? `شما ${farmer?.name} را دنبال نمی‌کنید`
        : `شما اکنون ${farmer?.name} را دنبال می‌کنید`,
    });
  };

  const handleReserve = (lotId: string) => {
    router.push(`/lot/${lotId}`);
  };

  if (isLoading) {
    return <FarmerProfileSkeleton />;
  }

  if (!farmer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">کشاورز یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8" dir="rtl">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-elev">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="بازگشت"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">{farmer.name}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <FarmerHeader
          farmer={farmer}
          isFollowing={isFollowing}
          onFollow={handleFollow}
        />

        <div className="border-t border-elev">
          <div className="flex">
            <button
              onClick={() => setActiveTab("lots")}
              className={`flex-1 h-12 flex items-center justify-center gap-2 font-medium text-sm border-b-2 transition-colors ${activeTab === "lots"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
                }`}
            >
              <List className="h-4 w-4" />
              محصولات
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 h-12 flex items-center justify-center gap-2 font-medium text-sm border-b-2 transition-colors ${activeTab === "about"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
                }`}
            >
              <Grid3x3 className="h-4 w-4" />
              درباره
            </button>
          </div>
        </div>

        <div className="p-4">
          {activeTab === "lots" ? (
            <div className="space-y-4">
              {lots.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  هنوز محصولی ثبت نشده است
                </p>
              ) : (
                lots.map((lot) => (
                  <LotCard
                    key={lot.lot.id}
                    farmer={lot.farmer}
                    lot={lot.lot}
                    onReserve={handleReserve}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">بیوگرافی</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  کشاورز فعال در منطقه {farmer.region}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">آمار</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-bold">{lots.length}</div>
                    <div className="text-xs text-muted-foreground">محصولات فعال</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-xs text-muted-foreground">امتیاز</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <div className="text-2xl font-bold">580</div>
                    <div className="text-xs text-muted-foreground">سفارشات</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

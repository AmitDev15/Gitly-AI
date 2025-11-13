"use client";

import {
  Info,
  Coins,
  Zap,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  History,
  Calendar,
  ArrowUpCircle,
  CheckCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { Badge } from "~/components/ui/badge";
import { createCheckoutSession } from "~/lib/stripe";
import { api } from "~/trpc/react";

const BillingPage = () => {
  const { data: user } = api.project.getMyCredits.useQuery();
  const { data: transactions } = api.project.getCreditsTransaction.useQuery();
  const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100]);
  const creditsToBuyAmount = creditsToBuy[0]!;
  const price = (creditsToBuyAmount / 50).toFixed(2); // $1 for 50 credits

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
          Billing & Credits
        </h1>
        <p className="text-muted-foreground">
          Manage your credits and purchase more to index repositories
        </p>
      </div>

      {/* Current Balance Card */}
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="from-primary/20 to-primary/10 flex size-16 items-center justify-center rounded-xl bg-gradient-to-br">
                <Coins className="text-primary size-8" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Available Credits
                </p>
                <p className="text-4xl font-bold">
                  {user?.credits?.toLocaleString() || 0}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
              <Zap className="size-4" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-50/50 dark:border-blue-900/50 dark:from-blue-950/20 dark:to-blue-950/10">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Info className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                How Credits Work
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Each credit allows you to index 1 file in a repository.
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Example: Indexing a repository with 500 files will cost 500
                credits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Credits Card */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="from-primary/20 to-primary/10 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br">
              <ShoppingCart className="text-primary size-6" />
            </div>
            <div>
              <CardTitle>Purchase Credits</CardTitle>
              <CardDescription>
                Select the amount of credits you want to buy
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Credit Amount Display */}
          <div className="border-primary/20 from-primary/5 rounded-lg border bg-gradient-to-br to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Credits to Purchase
                </p>
                <p className="text-primary text-4xl font-bold">
                  {creditsToBuyAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-sm font-medium">
                  Total Price
                </p>
                <p className="text-4xl font-bold">${price}</p>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Adjust Amount</span>
              <span className="text-muted-foreground">10 - 1,000 credits</span>
            </div>
            <Slider
              defaultValue={[100]}
              max={1000}
              min={10}
              step={10}
              onValueChange={(value) => setCreditsToBuy(value)}
              value={creditsToBuy}
              className="py-4"
            />
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>10</span>
              <span>250</span>
              <span>500</span>
              <span>750</span>
              <span>1,000</span>
            </div>
          </div>

          {/* Pricing Info */}
          <div className="bg-muted/50 flex items-center justify-center gap-2 rounded-lg p-3">
            <TrendingUp className="text-muted-foreground size-4" />
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">$1</span> = 50
              credits
            </p>
          </div>

          {/* Purchase Button */}
          <Button
            onClick={() => {
              createCheckoutSession(creditsToBuyAmount);
            }}
            className="w-full gap-2 text-base"
            size="lg"
          >
            <CreditCard className="size-5" />
            Buy {creditsToBuyAmount.toLocaleString()} credits for ${price}
          </Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="from-primary/20 to-primary/10 flex size-12 items-center justify-center rounded-lg bg-gradient-to-br">
              <History className="text-primary size-6" />
            </div>
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View your credit purchase history
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!transactions || transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <div className="bg-muted flex size-16 items-center justify-center rounded-full">
                <History className="text-muted-foreground size-8" />
              </div>
              <div>
                <h3 className="font-semibold">No transactions yet</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Your credit purchase history will appear here
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="group hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
                      <ArrowUpCircle className="size-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          +{transaction.credits.toLocaleString()} Credits
                        </p>
                        <Badge variant="secondary" className="gap-1 text-xs">
                          <CheckCircle className="size-3" />
                          Completed
                        </Badge>
                      </div>
                      <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                        <Calendar className="size-3.5" />
                        <span>
                          {new Date(transaction.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(transaction.credits / 50).toFixed(2)}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {(transaction.credits / 50).toFixed(2)} USD
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;

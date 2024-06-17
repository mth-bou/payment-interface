import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { sendPayment } from "@/services/paymentService.ts";
import { Loader } from "@/components/ui/loader.tsx";

const formSchema = z.object({
  amount: z.coerce.number().min(0.01, "Required"),
  paymentMethod: z.enum(["Credit Card", "Paypal", "Crypto"]),
})

const PaymentForm: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      paymentMethod: undefined,
    },
  })

  const handlePayment = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await sendPayment(values.amount, values.paymentMethod);
      if (result.state === "success") {
        console.log(`Payment of ${result.amount} using ${values.paymentMethod} processed successfully.`);
        toast({
          title: "Payment successful",
          description: `Payment of ${result.amount} using ${values.paymentMethod} processed successfully.`
        });
      }
    } catch (error) {
      console.error("Payment failed: ", error);
      toast({
        title: "Payment failed",
        description: "An error occurred while processing the payment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-10 xs:p-4 flex justify-center">
      <Card className="w-auto">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Send money easily.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePayment)} className="flex flex-col justify-center gap-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount : </FormLabel>
                      <FormControl>
                        <Input placeholder="0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Give the amount to send
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method : </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a payment method" {...field} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Payment Method</SelectLabel>
                              <SelectItem value="Credit Card">Credit Card</SelectItem>
                              <SelectItem value="Paypal">Paypal</SelectItem>
                              <SelectItem value="Crypto">Crypto</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="self-center"
                disabled={isLoading}
              >
                {isLoading ? <Loader size={20} /> : "Send"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;

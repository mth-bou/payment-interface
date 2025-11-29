import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { sendPayment } from "@/services/paymentService";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  amount: z
    .number({ message: "Required" })
    .min(0.01, { message: "Required" }),
  paymentMethod: z.enum(["Credit Card", "Paypal", "Crypto"], {
    message: "Select a payment method",
  }),
});

type PaymentFormValues = z.output<typeof formSchema>; // { amount: number; paymentMethod: ... }

const PaymentForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      paymentMethod: "Credit Card",
    },
  });

  const handlePayment: SubmitHandler<PaymentFormValues> = async (values) => {
    const validatedData = formSchema.parse(values);

    setIsLoading(true)
    try {
      const result = await sendPayment(validatedData.amount, validatedData.paymentMethod)
      if (result.state === "success") {
        toast.success(
          `Payment of ${result.amount} using ${values.paymentMethod} processed successfully.`
        )
      }
    } catch (error) {
      console.error("Payment failed: ", error)
      toast.error(
        "Payment failed: An error occurred while processing the payment."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-10 flex justify-center">
      <Card className="w-auto border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Payment</CardTitle>
          <CardDescription>Send money easily.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePayment)}
              className="flex flex-col justify-center gap-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0"
                          value={field.value ?? 0}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? 0 : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Give the amount to send
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* paymentMethod */}
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Payment Method</SelectLabel>
                              <SelectItem value="Credit Card">
                                Credit Card
                              </SelectItem>
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
                {isLoading ? <Spinner /> : "Send"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;

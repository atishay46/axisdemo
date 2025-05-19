import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import AIChatBox from '../components/AIChatBox';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  role: z.string().min(1, { message: "Please select your role." }),
  passType: z.string().min(1, { message: "Please select a pass type." }),
});

type FormValues = z.infer<typeof formSchema>;

const ROLE_OPTIONS = [
  { value: 'engineer', label: 'Space Engineer' },
  { value: 'scientist', label: 'Scientist/Researcher' },
  { value: 'executive', label: 'Executive/Manager' },
  { value: 'student', label: 'Student' },
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'enthusiast', label: 'Space Enthusiast' },
  { value: 'other', label: 'Other' },
];

const PASS_OPTIONS = [
  { value: 'standard', label: 'Standard Pass (₹499)' },
  { value: 'premium', label: 'Premium Pass (₹899)' },
];

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      role: '',
      passType: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log registration data (in a real app, this would be sent to an API)
      console.log('Registration submitted:', values);
      
      // Show success message
      toast.success('Registration successful!', {
        description: `Thank you for registering, ${values.firstName}! A confirmation email has been sent to ${values.email}.`,
        duration: 5000,
      });
      
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed', {
        description: 'There was an error processing your registration. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBE6] dark:bg-black text-black dark:text-white">
      <div className="absolute inset-0 z-0 magic-grid opacity-30"></div>
      <Navbar />
      
      <div className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Register for AXIS 2025
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Secure your spot at the most anticipated space technology event of the year.
            Join industry leaders, innovators, and enthusiasts in shaping the future of space exploration.
          </p>
        </div>
        
        {isSuccess ? (
          <div className="glass-effect rounded-xl p-8 max-w-md mx-auto text-center">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-2xl font-bold mb-4 gradient-text">Registration Complete!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for registering for AXIS 2025! A confirmation email has been sent with all the details.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              If you have any questions, please contact us at <a href="mailto:info@axis2025.com" className="text-axis-neon-blue hover:underline">info@axis2025.com</a>
            </p>
            <Button 
              onClick={() => setIsSuccess(false)}
              className="bg-gradient-to-r from-axis-neon-blue to-axis-neon-purple hover:from-axis-neon-purple hover:to-axis-neon-pink text-black font-medium"
            >
              Register Another Attendee
            </Button>
          </div>
        ) : (
          <div className="form-container">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Organization (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="SpaceTech Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ROLE_OPTIONS.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="passType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pass Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your pass type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PASS_OPTIONS.map((pass) => (
                            <SelectItem key={pass.value} value={pass.value}>
                              {pass.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-axis-neon-blue via-axis-neon-purple to-axis-neon-pink hover:from-axis-neon-pink hover:via-axis-neon-purple hover:to-axis-neon-blue text-black font-medium py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Complete Registration'}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
      
      <AIChatBox />
      <Footer />
    </div>
  );
};

export default Register;

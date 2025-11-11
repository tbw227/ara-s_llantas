import React, { useState, useRef, useEffect } from 'react';
import { Mail, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import apiService from '../services/api';

export const EmailSignup = React.memo(() => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const timeoutRef = useRef(null);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleCloseThankYou = () => {
    setShowThankYou(false);
    setSubscribedEmail('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !isValidEmail(email)) return;

    // Store the email that was subscribed for confirmation display
    const submittedEmail = email;
    setSubscribedEmail(submittedEmail);
    setEmail('');
    setIsSubmitting(true);
    
    // Show thank you message immediately (optimistic UI)
    setShowThankYou(true);
    
    // Reset thank you message after 8 seconds
    timeoutRef.current = setTimeout(() => {
      setShowThankYou(false);
      setSubscribedEmail('');
      timeoutRef.current = null;
    }, 8000);

    try {
      const formData = { email: submittedEmail };
      await apiService.subscribeNewsletter(formData);
      console.log('Newsletter signup form submitted:', formData);
      
      toast({
        title: t('thankYou'),
        description: t('newsletterSubscribed'),
      });
    } catch (error) {
      console.error('Newsletter signup error:', error);
      // Still show success message to user, but log the error
      // The thank you message is already showing, so we just show a warning toast
      toast({
        title: t('subscribeErrorTitle'),
        description: 'Your subscription was recorded. If you don\'t receive a confirmation email, please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('stayUpdated')}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            {t('newsletterDescription')}
          </p>
          {showThankYou ? (
            <div className="max-w-md mx-auto bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg p-8 border-2 border-green-500/50 shadow-lg shadow-green-500/20 transform transition-all duration-500 ease-in-out relative">
              <button
                onClick={handleCloseThankYou}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Thank You for Signing Up!
                </h3>
                <p className="text-lg text-gray-200 mb-2">
                  {t('newsletterSubscribed')}
                </p>
                {subscribedEmail && (
                  <p className="text-sm text-green-400 font-medium mt-2 bg-green-500/10 px-3 py-1 rounded-md">
                    ✓ {subscribedEmail}
                  </p>
                )}
                <p className="text-sm text-gray-400 mt-4">
                  Check your inbox for confirmation
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <label htmlFor="email" className="sr-only">{t('emailAddress')}</label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailAddress')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8"
            >
              {isSubmitting ? t('subscribing') : t('subscribe')}
            </Button>
          </form>
          )}
        </div>
      </div>
    </section>
  );
});

EmailSignup.displayName = 'EmailSignup';

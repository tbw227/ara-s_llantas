import React, { useState, useEffect, useRef } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import apiService from '../services/api';

export const ExitModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const timeoutRef = useRef(null);

  // Auto-close modal after showing thank you message
  useEffect(() => {
    if (showThankYou && isOpen) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Auto-close after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setShowThankYou(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        onClose();
      }, 5000);
    }

    // Cleanup on unmount or when showThankYou changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showThankYou, isOpen, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setShowThankYou(false);
      setIsSubmitting(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiService.submitContact(formData);
      setShowThankYou(true);
      toast({
        title: t('thankYou'),
        description: t('getBackSoon'),
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Contact form error:', error);
      }
      toast({
        title: t('subscribeErrorTitle'),
        description: t('subscribeError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setShowThankYou(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onClose();
  };

  const handleOpenChange = (open) => {
    if (!open) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        {showThankYou ? (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-white text-center">
                {t('thankYou')}
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-center mt-2">
                {t('getBackSoon')}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8"
              >
                {t('justLeave')}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {t('beforeYouGo')}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {t('exitModalText')}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder={t('yourName')}
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder={t('emailAddress')}
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Input
              type="tel"
              name="phone"
              placeholder={t('phoneNumber')}
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Textarea
              name="message"
              placeholder={t('howCanHelp')}
              value={formData.message}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-24"
            />
          </div>
          <div className="flex space-x-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('submitting')}
                </>
              ) : (
                t('submit')
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {t('justLeave')}
            </Button>
          </div>
        </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
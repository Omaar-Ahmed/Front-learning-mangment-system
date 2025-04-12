"use client"
import Loading from '@/components/Loading'
import WizardStepper from '@/components/WizardStepper'
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import ChechoutDetailsPage from './details'
import PaymentPage from './payment'
import CompletionPage from './completion'

const CheckoutWizard = () => {
    const { isLoaded } = useUser()
    const { checkoutStep } = useCheckoutNavigation();

    if (!isLoaded) return <Loading />
    const renderStep = () => {
        switch (checkoutStep) {
            case 1:
                return <ChechoutDetailsPage />
            case 2:
                return <PaymentPage />
            case 3:
                return <CompletionPage />
            default:
                return <ChechoutDetailsPage />
        }
    }
    return (
        <div className='checkout'>
            <WizardStepper currentStep={checkoutStep} />
            <div className='checkout__content'>
                {renderStep()}
            </div>
        </div>
    )
}

export default CheckoutWizard

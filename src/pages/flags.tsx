import { MouseEvent, useEffect } from 'react';
import React, { useCallback, useState } from 'react';

import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useFlags } from '@/hooks/useFlags';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { VmComponent } from '@/components/vm/VmComponent';
import styled from 'styled-components';
import { Text } from '@/components/lib/Text/Text';
import { SubmitHandler, useForm } from 'react-hook-form';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

type FormData = {
  bosLoaderUrl: string;
};

const FlagsPage: NextPageWithLayout = () => {
  const [flags, setFlags] = useFlags();
  const form = useForm<FormData>();

  useClearCurrentComponent();

  useEffect(() => {
    form.setValue('bosLoaderUrl', flags?.bosLoaderUrl || '');
  }, [flags]);

  const submitHandler: SubmitHandler<FormData> = (data) => {
    setFlags(data);
  };

  return (
    <Container className="container-xl">
      <Text as="h1" font="text-3xl">
        Flags
      </Text>

      <Form onSubmit={form.handleSubmit(submitHandler)}>
        <InputGrid>
          <Text as="label" font="text-s" weight="500" htmlFor="bosLoaderUrl">
            BOS Loader Url
          </Text>

          <input
            className="form-control"
            placeholder="e.g. http://127.0.0.1:3030/, https://my-loader.ngrok.io"
            id="bosLoaderUrl"
            {...form.register('bosLoaderUrl')}
          />
        </InputGrid>

        <VmComponent
          src="near/widget/DIG.Button"
          props={{
            label: 'Save Flags',
            variant: 'affirmative',
            size: 'large',
            type: 'submit',
            style: { marginLeft: 'auto' },
          }}
        />
      </Form>
    </Container>
  );
};

FlagsPage.getLayout = useDefaultLayout;

export default FlagsPage;

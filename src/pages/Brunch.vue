<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            src="https://s3.amazonaws.com/info.craftedcrowds.imgs/Brunch_sm-2015.jpeg"
          />
        </q-card-section>
        
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Hoboken Social Sandbox</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Brunch at Wicked Wolf</div>
          <div class="text-caption">
           Join the Hoboken Social Sandbox for brunch at Wicked Wolf on Feb 9th at 11:30 AM. In order to participate you must pay $3 using the buy now button below.<br/>
           This is to ensure that we are registring people who are serious about showing up to the brunch.
          </div>
        </q-card-section>
    

        <q-separator />

        <q-card-actions>
          <q-btn flat round icon="event" />
          <q-btn flat>
            Feb 9th. 7:30PM
          </q-btn>
          <q-btn flat color="primary">
            Reserve: 
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="J29DKHKDMZ7M2">
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>

          </q-btn>
        </q-card-actions>
      </q-card>
    </div>

    </q-page>
</template>

<script>
export default {
  name: 'Brunch'
};
</script>
